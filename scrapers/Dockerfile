FROM ghcr.io/puppeteer/puppeteer:21.6.1

WORKDIR /app

COPY *.json ./

RUN npm ci

COPY ./ ./

RUN npm run build

EXPOSE 8082

CMD ["npm","start"]
