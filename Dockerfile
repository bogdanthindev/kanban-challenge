FROM node:latest
WORKDIR /src
RUN npm install nodemon -g

EXPOSE 3000

