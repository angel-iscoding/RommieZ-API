# Dockerfile for RommieZ-API
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Google Cloud SQL Connector
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Create directory for Google Cloud credentials
RUN mkdir -p /app/credentials

# Expose the API port
EXPOSE 3010

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3010/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the API
CMD ["npm", "run", "start"]
