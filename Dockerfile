# Use a lightweight official Node.js image as the base
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's caching
# This ensures npm install is only run if dependencies change
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Node.js application listens on
EXPOSE 3000

# Define the command to run your application when the container starts
CMD ["node", "index.js"]