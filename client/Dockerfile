FROM node:21-alpine3.18 AS builder

WORKDIR /app

COPY *.json ./

RUN npm ci --verbose

COPY . .

RUN npm run build

FROM nginx:1.25.3-alpine AS final

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist .

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
