FROM node:20-alpine

ENV HOME=/home/app
WORKDIR $HOME

COPY package*.json ./

RUN npm install --only=prod --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
