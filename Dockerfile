FROM node:7.9.0

RUN apt-get update

COPY package.json /tmp/package.json

RUN yarn global add gulp

RUN cd /tmp && yarn install

RUN mkdir -p /usr/app && cp -a /tmp/node_modules /usr/app

WORKDIR /usr/app

COPY ./ /usr/app/