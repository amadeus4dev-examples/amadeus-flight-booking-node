# Development and Testing
## Set up Node server

Go to the directory

```sh
cd server
```
Install depedencies
```sh
npm install
```

For authentication add your API Key/Secret to your `.bashrc` or `.zshrc` files or export then into your terminal before starting the Rails server

```sh
export AMADEUS_CLIENT_ID=YOUR_API_KEY
export AMADEUS_CLIENT_SECRET=YOUR_API_SECRET
```

You can easily switch between `test` and `production` environments:

```sh
export AMADEUS_HOSTNAME="production" # Be default the environment is set to test
```

> Each environment has different API keys. Do not forget to update them!


Launch the server
```sh
npm start
```

## Set up Vue js (client)

You need to install vue js cli 


```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

```sh
cd client
```
Install depedencies
```sh
npm install
```
Serve the project

```sh
npm run serve
```
