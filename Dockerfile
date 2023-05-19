# Use an official Node.js runtime as a parent image
FROM node:16-slim

# Set the working directory to /frontend
WORKDIR /frontend

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
