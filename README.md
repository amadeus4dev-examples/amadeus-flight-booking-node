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
============
##content blog

---
title: Node JS app for amadeus API with node sdk amadeus
date: 2020-03-23
---


 a flight booking app with Node.js 

Theophile Vast 

 

Today we’re going to learn how to build the backend for a flight booking app with Node.js. using Amadeus Quick-Connect, a flight booking bundle comprised of three Self-Service APIs: Flight Offers Search, Flight Offers Price and Flight Create Orders.  

 

This tutorial will cover: 

Setting up a simple Node.js server 

Creating a post request to get a list of flight deals 

Calling Flight Offers Price to get the final price 

Calling Flight Create Orders to complete the reservation 

 

You’ll see in the code that we’ve also implemented a search input field with a city/airport autocomplete functionality using the Airport & City Search API. For more details on how this is done, please read Airport & City Search using the MERN stack.  

 

﷟HYPERLINK "https://developers.amadeus.com/self-service/category/air/api-doc/flight-offers-search"We will fetch the API data directly calling the endpoints but remember that you can always use our Node SDK  to perform APIs calls: it wrappers the authorization process and hides the complexity of using the endpoints (URIs, headers, etc). 

 

At the end of the article, you’ll find a link to download the source code from the app from our GitHub page. 

 

Now, let’s start coding! 

 

 

## Setting up a simple Node.js server 

The first thing we need to get up and running is a simple Node.js server. Here’s an example of a minimal express server listening on port 3000: 

 
```javascript
server.js 

var express = require('express') 
var http = require('http').createServer(app);

var app = express(), 

var server = app.listen(process.env.PORT || 2800,()=>{
  console.log("Howdy, I am running at PORT 2800")
}) 
````


Now we need to install the amadeus node package  
```sh
npm install amadeus --save
```

and plug it to our server with our credentials :

```javascript
//content before
var Amadeus = require('amadeus');

var amadeus = new Amadeus({
  clientId: 'REPLACE_BY_YOUR_API_KEY',
  clientSecret: 'REPLACE_BY_YOUR_API_SECRET'
});
//content after
```


 

 

You can test it by connecting from your browser to localhost:3000. The server is very basic but don’t worry, we’ll be expanding it in a little while.   

 

##Getting a list of city

You can follow more in detail our article about the technique of setting up a server for city search.

here is the code for our purpose :

```javascript
app.get(`/citySearch`, async (req, res) => {
  console.log(req.query)
  var keywords = req.query.keyword;
  // var urlSend= "&keyword="+keyword
  // const { page, subType, keyword } = req.query;
  // API call with params we requested from client app
  const response = await amadeus.client.get("/v1/reference-data/locations", { 
    keyword : keywords,
    subType :"CITY,AIRPORT",
    // "page[offset]": 1 * 10
  }).catch(x=>console.log(x));
  // Sending response for client
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});
```

pass directly your city in the url localhost:2800/citysearch?keyword="YOUR_SEARCH"

 

## Creating a post request to get a list of flight deals 

Time to retrieve some flight offers! As Flight Offers Search documentation says, we need to use /shopping/flight-offers as endpoint. 

 

With everything in mind, we can build the request on the backend as follows: 

```javascript
app.post('/date', async function(req, res) {

  console.log(req.body)
  departure = req.body.departure;
  arrival = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival =req.body.locationArrival;

const response = await amadeus.shopping.flightOffersSearch.get({
    originLocationCode: locationDeparture,
    destinationLocationCode: locationArrival,
    departureDate: departure,
    adults: '1'
}).catch(err=>console.log(err))

 try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }

  }); 
```

You can call now http://localhost:2800/date?departure=2020-05-01&arrival=2020-02-27&locationDeparture=MAD&locationArrival=LAX. Each parameters can be modify.

The API call returns a list of flight-offers objects. Next step: getting the final flight price before booking. 

 

##Calling Flight Offers Price to get the final flight price 

The price and availability of a seat can change between the time of search and the time of booking, so we’ll need to confirm the price before sending it to the Create Order endpoint. To do this, we select an item from the Flight Offers Search response and we pass it to another request: 

```javascript
app.post('/flightprice', async function(req, res) {
  res.json(req.body);
  inputFlight = req.body;
  console.log(req.body)

  const responsePricing = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        'data': {
          'type': 'flight-offers-pricing',
          'flightOffers': inputFlight
        }})).catch(err=>console.log(err))

   try {
    await res.json(JSON.parse(responsePricing.body));
  } catch (err) {
    await res.json(err);
  }

   })

   ```

inputFlight is your flight offer that you select from your llast call to the api

 

Once the price and availability are confirmed, you can move to the final step. 

 

 

##Calling Flight Create Orders to complete the booking 

After selecting a flight and confirming the price, it’s time to book the ticket! We do this by creating a request containing the selected flight offer and the passenger data (name, lastname and mail are enough for this demo) and passing it to a function: 

```javascript
app.post('/flightCreateOrder', async function(req, res) {
  res.json(req.body);

  let inputFlightCreateOrder = req.body;
console.log(req.body)
const returnBokkin = amadeus.booking.flightOrders.post(
      JSON.stringify({
  "data": {
    "type": "flight-order",
    "flightOffers": [
           inputFlightCreateOrder
        ],
    "travelers": [
      {
        "id": "1",
        "dateOfBirth": "1982-01-16",
        "name": {
          "firstName": "JORGE",
          "lastName": "GONZALES"
        },
        "gender": "MALE",
        "contact": {
          "emailAddress": "jorge.gonzales833@telefonica.es",
          "phones": [
            {
              "deviceType": "MOBILE",
              "countryCallingCode": "34",
              "number": "480080076"
            }
          ]
        },
        "documents": [
          {
            "documentType": "PASSPORT",
            "birthPlace": "Madrid",
            "issuanceLocation": "Madrid",
            "issuanceDate": "2015-04-14",
            "number": "00000000",
            "expiryDate": "2025-04-14",
            "issuanceCountry": "ES",
            "validityCountry": "ES",
            "nationality": "ES",
            "holder": true
          }
        ]
      },
      {
        "id": "2",
        "dateOfBirth": "2012-10-11",
        "gender": "FEMALE",
        "contact": {
          "emailAddress": "jorge.gonzales833@telefonica.es",
          "phones": [
            {
              "deviceType": "MOBILE",
              "countryCallingCode": "34",
              "number": "480080076"
            }
          ]
        },
        "name": {
          "firstName": "ADRIANA",
          "lastName": "GONZALES"
        }
      }
    ]
  }
})

    ).then(function(response){
    console.log(response.result);
}).catch(function(responseError){
    console.log(responseError);
});

})

```
inputFlightCreateOrder is the response from flight offer pricing.
 

In the response object, there is a value call reference with the flight confirmation number.  

 

Congrats! You are ready to fly! 

 

 

Source code : https://github.com/amadeus4dev/amadeus-flight-booking-node
 

The complete code is available on the Amadeus for Developers GitHub page. 

 

In order to run the server, switch to the server folder, install the dependencies with: 

 
```sh
npm  install 
 
```
And run the server by typing: 

 
```sh
npm run start  
```
The backend will listen for incoming connection on port 2800. At this point you can either use the client based on vue.js which is on the repository, or use postman to perform the calls to the backend. 