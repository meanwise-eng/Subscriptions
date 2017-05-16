FROM node:7.9.0

RUN mkdir -p /app

RUN cd /app && yarn global add gulp && yarn install

WORKDIR /app

CMD ["yarn", "start"]