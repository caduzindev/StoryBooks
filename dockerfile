FROM node:14-alpine

WORKDIR /home/node/app

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build

CMD [ "npm","start" ]