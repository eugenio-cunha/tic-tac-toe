FROM node:10.16.2-alpine

ENV HOME='/app'

EXPOSE 3000

WORKDIR $HOME
COPY ./ $HOME

RUN npm install --only=prod \
    && npm rebuild --quiet 

CMD [ "npm", "start" ]
