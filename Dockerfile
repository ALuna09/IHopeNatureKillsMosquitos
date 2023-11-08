# Start your image with a node base image
FROM node:19.5.0-alpine as BUILD_IMAGE

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install 
    # && npm install -g serve \
    # && npm i -g vite \
    # && npm run build \
    # && rm -fr node_modules

# Copy local directories to the current local directory of our docker image (/app)
# COPY ./src ./src
# COPY ./public ./dist
COPY . .

RUN npm run build

EXPOSE 5173

COPY vite.config.js .

# Start the app using serve command
# CMD [ "serve", "-s", "build" ]
CMD ["npm", "run", "dev"]