FROM node:21-alpine3.18

RUN apk update
RUN apk add ffmpeg
RUN apk add bash
RUN apk add dos2unix

WORKDIR /app

COPY *.json ./

RUN npm ci

COPY ./ ./

RUN dos2unix ./src/scripts/convert_to_audio.sh
RUN dos2unix ./src/scripts/export.sh

RUN npm run build

EXPOSE 8081

CMD ["npm","start"]
