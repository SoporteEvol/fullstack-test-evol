# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code
COPY . .

# Build the project
RUN pnpm run build

# Expose port and run the app
EXPOSE 4000
CMD ["pnpm", "run", "start:prod"]
