FROM node:slim

RUN apt-get update
RUN apt-get install curl gnupg -y
RUN curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install google-chrome-stable -y --no-install-recommends

RUN rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY *.json ./

RUN npm ci --verbose

COPY ./ ./

RUN npm run build

EXPOSE 8082

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

CMD ["npm","start"]
