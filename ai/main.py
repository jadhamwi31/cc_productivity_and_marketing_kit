
import random
from pydantic import BaseModel
from transformers import pipeline
from fastapi import FastAPI,File, UploadFile
from fastapi.responses import JSONResponse
from typing import List

englishTranscriptPipeline = pipeline(
    "automatic-speech-recognition",
    model="Subcold/whisper-small-preprocessed-en",chunk_length_s=30
)
arabicTranscriptPipeline = pipeline(
    "automatic-speech-recognition",
    model="Foxasdf/whisper-base-ar",chunk_length_s=30
)

reactionsPipeline = pipeline(
    model="lxyuan/distilbert-base-multilingual-cased-sentiments-student", 
    return_all_scores=True
)
  
app = FastAPI()


@app.post("/transcript/arabic")
async def transcript(file: UploadFile):
    try:
        fileObject = await file.read()
        result = arabicTranscriptPipeline(fileObject,batch_size=8,return_timestamps=True)
        print(result)
        return JSONResponse(content=result, status_code=200)
    except Exception as e: 
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post("/transcript/english")
async def transcript(file: UploadFile):
    try:
        fileObject = await file.read()
        result = englishTranscriptPipeline(fileObject,batch_size=8,return_timestamps=True)
        print(result)
        return JSONResponse(content=result, status_code=200)
    except Exception as e: 
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
    
class Comments(BaseModel):
    comments:List[str]

def get_reactions_for_comment(comment: str):
    [[positive,neutral,negative]] = reactionsPipeline(comment)
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
        average = calculateReactionsAverage(comments)
    
        return JSONResponse(content=average, status_code=200)
    except Exception as e: 
        return JSONResponse(content={"error": str(e)}, status_code=500)