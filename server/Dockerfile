FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG AMADEUS_CLIENT_ID
ARG AMADEUS_CLIENT_SECRET

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
