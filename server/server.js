var app = require('express')();
var http = require('http').createServer(app);
const socket = require('socket.io')
const cors = require('cors')
var express = require('express')

const Amadeus = require("amadeus");
const bodyParser = require('body-parser');
var parse = require('socket.io')(http);
const fetch = require('node-fetch');
var { token, flightSearch, createOrder, flightPrice,citySearch, endpoints } = require('@tvast/plume.js')
let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}
app.use(allowCrossDomain);
var NaseUrl = "https://test.api.amadeus.com"
let returnSearch ="";
let confirmOrder = "";
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

var amadeus = new Amadeus({
  clientId: 'qztkbf5XWjNSGkXRF9bfAwNg6bELWvVD',
  clientSecret: 'w9mJ7ZJzlEGNffut'
});

app.post('/citySearch', function(req, res) {

  



})

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
    
//   try 
// {
//   token("","").then(function(tokenAuth){
   
//     var NaseUrl = "https://test.api.amadeus.com"
//      try {
//           citySearch(endpoints.citySearch, NaseUrl, urlSend, tokenAuth.access_token).then(function(y){
//           console.log(y)
//           returnSearch=y
//           res.send(JSON.stringify(y));
//           });
//         } 
//         catch(error) {
//           console.error(error);
//         }

//       })}
//       catch(error) {
//       console.error(error);
//     }
    
// })
// //get flight offer
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

// try 
// {
//   token("","").then(function(tokenAuth){

//     console.log(tokenAuth);

//       try {
//       flightPrice(NaseUrl,endpoints.flightPrice,inputFlight, tokenAuth.access_token).then(function(z) {
//         // confirmOrder = z
//         console.log(z)
//         }).catch(function(error) {console.error(error);})
//       }
      
//       catch(error) {
//       console.error(error); 

//     }
        
//   }).catch(function(error) {
//   console.error(error);
// });
//       }

//   catch(error) {
//   console.error(error);
//      }

   })
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
    confirmOrder = response.result
}).catch(function(responseError){
    console.log(responseError);
});

  //  try {
  //   await res.json(JSON.stringify(confirmOrder));
  // } catch (err) {
  //   await res.json(err);
  // }

})
// var NaseUrl = "https://test.api.amadeus.com"
//   try 
// {
//   token("qztkbf5XWjNSGkXRF9bfAwNg6bELWvVD","w9mJ7ZJzlEGNffut").then(function(tokenAuth){

//       try {
//       createOrder(NaseUrl,endpoints.createOrder,inputFlightCreateOrder, "a@gmail.com", tokenAuth.access_token).then(function(z) {
//         confirmOrder = z
//         console.log(z);
//         }).catch(function(error) {console.error(error);})
//       }
      
//       catch(error) {
//       console.error(error); 

//     }
        
//   }).catch(function(error) {
//   console.error(error);
// });
//       }

//   catch(error) {
//   console.error(error);
//      }

app.get('/flightcretaeorderget', function(req, res) {
  res.send(JSON.stringify(confirmOrder));
});


var server = app.listen(process.env.PORT || 2800,()=>{
  console.log("Howdy, I am running at PORT 2800")
})

let io =  socket(server);

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
})
