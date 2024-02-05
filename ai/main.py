import random
import asyncio
from concurrent.futures import ThreadPoolExecutor
from pydantic import BaseModel
from transformers import pipeline
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List

englishTranscriptPipeline = pipeline(
    "automatic-speech-recognition",
    model="Subcold/whisper-small-preprocessed-en", chunk_length_s=30
)
arabicTranscriptPipeline = pipeline(
    "automatic-speech-recognition",
    model="Foxasdf/whisper-base-ar", chunk_length_s=30
)

reactionsPipeline = pipeline(
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
    return_all_scores=True
)

app = FastAPI()

executor = ThreadPoolExecutor()


@app.post("/transcript/arabic")
async def transcript(file: UploadFile):
    try:
        fileObject = await file.read()
        result = await run_in_threadpool(arabicTranscriptPipeline, fileObject, return_timestamps=True,batch_size=8)
        print(result)
        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/transcript/english")
async def transcript(file: UploadFile):
    try:
        fileObject = await file.read()
        result = await run_in_threadpool(englishTranscriptPipeline, fileObject, return_timestamps=True,batch_size=8)
        print(result)
        return JSONResponse(content=result, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


class Comments(BaseModel):
    comments: List[str]


def get_reactions_for_comment(comment: str):
    [[positive, neutral, negative]] = reactionsPipeline(comment)
    return {
        "positive": positive["score"],
        "neutral": neutral["score"],
        "negative": negative["score"]
    }


def calculateReactionsAverage(comments: List[str]):
    total_positive = 0
    total_neutral = 0
    total_negative = 0

    for comment in comments:
        reactions = get_reactions_for_comment(comment)
        total_positive += reactions["positive"]
        total_neutral += reactions["neutral"]
        total_negative += reactions["negative"]

    num_comments = len(comments)
    average_positive = total_positive / num_comments
    average_neutral = total_neutral / num_comments
    average_negative = total_negative / num_comments

    return {
        "positive": average_positive,
        "neutral": average_neutral,
        "negative": average_negative
    }


@app.post("/reactions")
async def reactions(body: Comments):
    try:
        comments = body.comments
        average = await run_in_threadpool(calculateReactionsAverage, comments)

        return JSONResponse(content=average, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


async def run_in_threadpool(func, *args, **kwargs):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, lambda: func(*args, **kwargs))
