FROM node:14-slim

WORKDIR = /app

ENV NODE_ENV=production
COPY package*.json .
RUN npm install

COPY index.js .
RUN mkdir /state

CMD node index.js
