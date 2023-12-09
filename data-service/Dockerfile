FROM node:20 as build

# Create app directory
WORKDIR /usr/src/todo-data

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY ../data-service/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ../data-service/ .

# Creates a "dist" folder with the production build
RUN npm run build
#
## Start the server using the production build
CMD [ "node", "dist/main.js" ]