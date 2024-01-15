
from transformers import pipeline
from fastapi import FastAPI,File, UploadFile
from fastapi.responses import JSONResponse

pipe = pipeline(
    "automatic-speech-recognition",
    model="Subcold/whisper-small-preprocessed-en",return_timestamps=True,batch_size=16
)


  
app = FastAPI()


@app.post("/transcript")
async def transcript(file: UploadFile):
    try:
        fileObject = await file.read()
        result = pipe(fileObject)
        print(result)
        return JSONResponse(content=result, status_code=200)
    except Exception as e: 
        return JSONResponse(content={"error": str(e)}, status_code=500)