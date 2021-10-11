# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY package.json /app

# Install all the dependencies
RUN npm install

# Copy src files to app folder
COPY . /app

# Build project in the app folder
RUN npm run build --prod

# Stage 2: Starting the nginx server
FROM nginx:latest

COPY --from=build /app/dist/video-selector /usr/share/nginx/html

EXPOSE 4200:4200
