FROM node:7.9.0

RUN mkdir -p /usr/app

COPY ./ /usr/app/

RUN cd /usr/app && yarn global add gulp && yarn install

WORKDIR /usr/app

CMD ["yarn", "start"]