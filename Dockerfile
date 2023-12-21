# Start your image with a node base image
FROM node:19.5.0-alpine as BUILD_IMAGE

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install 

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

RUN npm run build

EXPOSE 3000

COPY vite.config.js .

# Start the app using serve command
CMD ["npm", "run", "dev"]