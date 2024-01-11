
from transformers import pipeline
from fastapi import FastAPI,File, UploadFile

pipe = pipeline(
    "automatic-speech-recognition",
    model="Subcold/whisper-small-preprocessed-en",
)



app = FastAPI()

@app.get("/transcript")
async def transcript(file: UploadFile):
    obj = await file.read()
    print(obj)
    return {"message": "Hello World"}