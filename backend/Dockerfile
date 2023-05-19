# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm i -g nodemon && \
    npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose the port that the application will listen on
EXPOSE 3001

# Start the application with nodemon
CMD ["nodemon"]
