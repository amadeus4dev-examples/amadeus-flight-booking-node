## NodeJS app for working with amadeus app

Hello folks. Today we'll learn how to start your proof of concept for a disruptive travel agency with the self service Amadeus API.

The architecture is pretty simple. You get the token from the amadeus API with your credentials given with you opened account at <a href="https://developers.amadeus.com/register">Amadeus</a>. ANd then you can ask the api to give you flight offers, inspiration travels and many other content from the Amadeus API.

FIrst thing first we need a simple Node js server to get it running 

```javascript
var express = require('express')

const bodyParser = require('body-parser');

const fetch = require('node-fetch');

 app = express(),
 port = process.env.PORT || 3000;

app.use(allowCrossDomain);

app.listen(port);
// console.log(tree)
console.log('Amadeus RESTful API server started on: ' + port);
```

This code is an instance of an express server. Who listen on the port 3000. Here is the package json to install the depedencies :
```javascript
{
  "name": "AmadeusSelfserviceApi",
  "version": "1.0.0",
  "description": "parse folder of ventyas to generate jSon",
  "main": "server.js",
  "scripts": {
    "start": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "theophile vast",
  "license": "ISC",
  "devDependencies": {
    "express": "^4.17.1",
    "nodemon": "^1.19.4"
  },
  "dependencies": {
    "express": "^4.17.1",
    "nodemon": "^1.19.4",
    "amadeus": "^3.2.0",
    "node-fetch": "^2.6.0",
    "node-static": "^0.7.11",
    "request": "^2.88.0",
  }
}
```

## First call to the API get the token

If you are familiar with Oauth it will be easy for you to navigat into the API of Amadeus. To get the token we add our url to the API, and we will fetch it to get the token.

```javascript
const uriAuth ="https://test.api.amadeus.com/v1/security/oauth2/token" 


//get grant
let headers= {
      // 'Content-Type': 'application/json'   
      'Content-Type': 'application/x-www-form-urlencoded',
     };

let body = {
   "grant_type": "client_credentials",
   "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  
}

let token="";

fetch(uriAuth, { method: 'POST', 
  headers: headers, 
  body: 'grant_type=client_credentials&client_id=' + body.client_id + '&client_secret=' + body.client_secret
})
  .then((res) => {
     return res.json()
})
.then((json) => {
  token=json.access_token;
  console.log(token);
  // Do something with the returned data.
});

```

Here we fetch the url passing the credentials into the body of the request as a string. And we save the token into a variable.

You can check the documentation if you get any error.



## Ask the API : Flight offer search

IF you are here it means that you got the precious token. Congratulations ! Now its time to build your request to post it and retrieve data from the Amadeus flight offer search endpoint.


```javascript
 let request = {
      "currencyCode": "USD",
      "originDestinations": [
      {
        "id": "1",
        "originLocationCode": locationDeparture,
        "destinationLocationCode": locationArrival,
        "departureDateTimeRange": {
          "date": departure,
          "time": "10:00:00"
        }
      },
      ],
      "travelers": [
      {
        "id": "1",
        "travelerType": "ADULT",
        "fareOptions": [
        "STANDARD"
        ]
      },
      ],
      "sources": [
      "GDS"
      ],
      "searchCriteria": {
        "maxFlightOffers": 50,
        "flightFilters": {
          "cabinRestrictions": [
          {
            "cabin": "BUSINESS",
            "coverage": "MOST_SEGMENTS",
            "originDestinationIds": [
            "1"
            ]
          }
          ],
        }
      }
    }
```

Where departure is the value desired for your search. It can come from a post from any frontend framework with the next code snippets : 

```javascript
app.post('/date', function(req, res) {
  departure = req.body.departure;
  arrival = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival =req.body.locationArrival;
  postUrlToken().then((data) => {
    window.console.log(data);
    token=data.access_token;
    // this.info3=data // JSON data parsed by `response.json()` call
  });
  updateFlightSearch(departure, arrival, locationArrival,locationDeparture).then((data) => {
    console.log(data);
    flightfrommadrid2=data.data // JSON data parsed by `response.json()` call
  });
  }); 
```
Now you can post your json variable to the api and get some data. We use asynchronous function call : 

```javascript
 const response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',authorization: 'Bearer '+token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(request) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
 
```
And if you want to serve your result to a route here is the snippets :
```javascript
app.get('/flightSearch', function(req, res) {
  res.send(JSON.stringify(flightfrommadrid2));
  console.log(flightfrommadrid2)
});
```

By the way we generate a new token on every functioin call : 


```javascript
async function postUrlToken() {
  // Default options are marked with *
  const response = await fetch(uriAuth+bodyDate, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'   
      'Content-Type': 'application/x-www-form-urlencoded',
     },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: 'grant_type=client_credentials&client_id=' + body.client_id + '&client_secret=' + body.client_secret// body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
```

## Ask the API : Flight offer prices

You need to post some data so here is the code to post some data on your node js app with the same logic.
```javascript
//get flight offer price

app.post('/flightprice', function(req, res) {
  res.json(req.body);
// console.log("request :"+JSON.stringify(req.body))
  inputFlight = req.body;
  console.log(inputFlight)
   // res.send(req.body);
   postUrlToken().then((data) => {
    window.console.log(data);
    token=data.access_token;
    // this.info3=data // JSON data parsed by `response.json()` call
  });
  flifghtPrice(inputFlight).then((data) => {
    console.log(data);
    data2=data // JSON data parsed by `response.json()` call
  });
    }); 
```
Then you need to pass the data generated to a async function :
```javascript
async function flifghtPrice(inputFlightOffer) {
  // Default options are marked with *
  const response = await fetch("https://test.api.amadeus.com/v2/shopping/flight-offers/pricing", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',authorization: 'Bearer '+token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(inputFlightOffer) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
```

And if you need to acdcess to the answer from amadeus here is the code to get the data:
```javascript
app.get('/flightPriceget', function(req, res) {
  res.send(JSON.stringify(data2));
  console.log(data2)
});// parses JSON response into native JavaScript objects
```

## Ask the API flight create order

Here is he tricky part. You need to build your request adding your flight offer and the data from the passenger:

```javascript
  "data": {
    "type": "flight-order",
    "flightOffers": [this.searchObject],
    "travelers": [
      {
        "id": "1",
        "dateOfBirth": "1982-01-16",
        "name": {
          "firstName": this.form.firstName,
          "lastName": this.form.lastName
        },
        "gender": "MALE",
        "contact": {
          "emailAddress": this.form.email = null,
          "phones": [
            {
              "deviceType": "MOBILE",
              "countryCallingCode": "33",
              "number": "0665735114"
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
      
    ],
    "remarks": {
      "general": [
        {
          "subType": "GENERAL_MISCELLANEOUS",
          "text": "ONLINE BOOKING FROM INCREIBLE VIAJES"
        }
      ]
    },
    "ticketingAgreement": {
      "option": "DELAY_TO_CANCEL",
      "delay": "6D"
    },
    "contacts": [
      {
        "addresseeName": {
          "firstName": "PABLO",
          "lastName": "RODRIGUEZ"
        },
        "companyName": "INCREIBLE VIAJES",
        "purpose": "STANDARD",
        "phones": [
          {
            "deviceType": "LANDLINE",
            "countryCallingCode": "34",
            "number": "480080071"
          },
          {
            "deviceType": "MOBILE",
            "countryCallingCode": "33",
            "number": "480080072"
          }
        ],
        "emailAddress": "support@increibleviajes.es",
        "address": {
          "lines": [
            "Calle Prado, 16"
          ],
          "postalCode": "28014",
          "cityName": "Madrid",
          "countryCode": "ES"
        }
      }
    ]
  }
 // parses JSON response into native JavaScript objects
```
SearchObject is your flight offer just got from the api. Then get the data in a post route :

```javascript
app.post('/flightCreateOrder', function(req, res) {
  res.json(req.body);
// console.log("request :"+JSON.stringify(req.body))
  inputFlightCreateOrder = req.body;
  console.log(inputFlightCreateOrder)
   // res.send(req.body);
  CreateOrder(inputFlightCreateOrder)
  .then((data) => {
    console.log(data);
    cretateOrder=data // JSON data parsed by `response.json()` call
  });;
    }); // parses JSON response into native JavaScript objects
```
The function called : 
```javascript
async function CreateOrder(inputFlightCreateOrder) {
  // Default options are marked with *
  const response = await fetch("https://test.api.amadeus.com/v1/booking/flight-orders", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',authorization: 'Bearer '+token
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(inputFlightCreateOrder) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
} // parses JSON response into native JavaScript objects
```
And the route to get the data : 

```javascript
app.get('/flightcretaeorderget', function(req, res) {
  res.send(JSON.stringify(cretateOrder));
  console.log(cretateOrder)
});// parses JSON response into native JavaScript objects
```
the complete code is available on github <a href="https://github.com/tvast/parser-amadeus-test">complete code</a>
