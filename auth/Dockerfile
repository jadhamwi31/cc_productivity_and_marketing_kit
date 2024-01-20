FROM node:21-alpine3.18

WORKDIR /app

COPY *.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

EXPOSE 8080

CMD ["npm","start"]
