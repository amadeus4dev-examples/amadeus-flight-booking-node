# Flight booking app using Node and Vue

This repository contains the source code for the blog article `Flight booking app using Node and Vue`. The article is split into two different parts:

- [Part 1](https://developers.amadeus.com/blog/javascript-flight-booking-app-node-vuejs)
- [Part 2](https://developers.amadeus.com/blog/javascript-flight-booking-app-node-vuejs-part-2)

## Running the code (with docker-compose)


1. For authentication add your API key/secret to your environmental variables.

```
export AMADEUS_CLIENT_ID=YOUR_API_KEY
export AMADEUS_CLIENT_SECRET=YOUR_API_SECRET
```

2. Build your Docker images 

```
docker-compose build
```
3. Start your application

```
docker-compose up
```

## Running the code (no Docker)

1. For authentication add your API key/secret to your environmental variables.

```
export AMADEUS_CLIENT_ID=YOUR_API_KEY
export AMADEUS_CLIENT_SECRET=YOUR_API_SECRET
```

2. Install the dependences and start the server:

```
cd server
npm install
npm start
```

3. Install the dependences and start the client:

```
cd client
npm install
npm run build && npm run serve
```

## License

This library is released under the [MIT License](LICENSE).

## Help

You can find us on [StackOverflow](https://stackoverflow.com/questions/tagged/amadeus) or join our developer community on
[Discord](https://discord.gg/cVrFBqx).

