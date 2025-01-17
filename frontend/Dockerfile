# Frontend Dockerfile
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN pnpm run build

# Use a lightweight HTTP server to serve the build
RUN npm add -g serve
EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
