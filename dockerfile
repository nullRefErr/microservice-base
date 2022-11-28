FROM node:16-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# USER node

WORKDIR /home/node/app
RUN chmod -R 777 /home/node/app
RUN addgroup app && adduser -S -G app app

COPY package*.json ./


RUN npm install

COPY --chown=node:node . .

EXPOSE 1338

ENV rev=1

CMD [ "npm", "start" ]