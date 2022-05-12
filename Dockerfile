# syntax=docker/dockerfile:1
FROM node:16-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 3000

CMD ["yarn", "start"]