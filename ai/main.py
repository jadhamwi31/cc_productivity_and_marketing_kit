
from transformers import pipeline
from fastapi import FastAPI,File, UploadFile
from fastapi.responses import JSONResponse

pipe = pipeline(
    "automatic-speech-recognition",
    model="Subcold/whisper-small-preprocessed-en",chunk_length_s=30
)


  
app = FastAPI()


@app.post("/transcript")
async def transcript(file: UploadFile):
    try:
        fileObject = await file.read()
        result = pipe(fileObject,batch_size=8,return_timestamps=True)
        print(result)
        return JSONResponse(content=result, status_code=200)
    except Exception as e: 
        return JSONResponse(content={"error": str(e)}, status_code=500)