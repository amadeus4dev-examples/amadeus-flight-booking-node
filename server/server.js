var app = require('express')();
var http = require('http').createServer(app);
const socket = require('socket.io')
const cors = require('cors')
var express = require('express')
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

app.post('/citySearch', function(req, res) {

  keyword = req.body.keyword;
  var urlSend= "&keyword="+keyword
    
  try 
{
  token("","").then(function(tokenAuth){
   
    var NaseUrl = "https://test.api.amadeus.com"
     try {
          citySearch(endpoints.citySearch, NaseUrl, urlSend, tokenAuth.access_token).then(function(y){
          console.log(y)
          returnSearch=y
          res.send(JSON.stringify(y));
          });
        } 
        catch(error) {
          console.error(error);
        }

      })}
      catch(error) {
      console.error(error);
    }
    
})
//get flight offer
app.post('/date', function(req, res) {
  departure = req.body.departure;
  arrival = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival =req.body.locationArrival;

try 
{
  token("","").then(function(tokenAuth){


      try {
          flightSearch(endpoints.searchFlight, NaseUrl,locationDeparture, locationArrival, departure, tokenAuth.access_token).then(function(y){
            returnFlightSearch=y
            res.send(JSON.stringify(y));
          })
        }

    catch(error) {
      console.error(error);
    }})

}
catch(error) {
  console.error(error);
}

  }); 

app.post('/flightprice', function(req, res) {
  res.json(req.body);
  inputFlight = req.body;

try 
{
  token("","").then(function(tokenAuth){

    console.log(tokenAuth);

      try {
      flightPrice(NaseUrl,endpoints.flightPrice,inputFlight, tokenAuth.access_token).then(function(z) {
        // confirmOrder = z
        console.log(z)
        }).catch(function(error) {console.error(error);})
      }
      
      catch(error) {
      console.error(error); 

    }
        
  }).catch(function(error) {
  console.error(error);
});
      }

  catch(error) {
  console.error(error);
     }

   })
app.post('/flightCreateOrder', function(req, res) {
  res.json(req.body);

  let inputFlightCreateOrder = req.body;
var NaseUrl = "https://test.api.amadeus.com"
  try 
{
  token("","").then(function(tokenAuth){

      try {
      createOrder(NaseUrl,endpoints.createOrder,inputFlightCreateOrder, "a@gmail.com", tokenAuth.access_token).then(function(z) {
        confirmOrder = z
        console.log(z);
        }).catch(function(error) {console.error(error);})
      }
      
      catch(error) {
      console.error(error); 

    }
        
  }).catch(function(error) {
  console.error(error);
});
      }

  catch(error) {
  console.error(error);
     }

   })

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
