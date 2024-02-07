FROM node:current-alpine

RUN apk add chromium

# Set up working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --verbose

# Copy application code
COPY ./ ./

# Build the application
RUN npm run build

# Expose port
EXPOSE 8082

# Set Puppeteer environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Set default command
CMD ["npm", "start"]
