FROM python:3.9.12-alpine

RUN apk add --no-cache g++ make

RUN apk add --no-cache rust cargo

WORKDIR /app

COPY ./requirements.txt .

RUN pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

RUN pip install -r requirements.txt

COPY . .

ARG PORT=8083

CMD uvicorn main:app --host 0.0.0.0 --port $PORT
