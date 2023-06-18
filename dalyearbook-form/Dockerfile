# Use the official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the app's source code
COPY . .

# Expose port 3000 for the app to run on
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
