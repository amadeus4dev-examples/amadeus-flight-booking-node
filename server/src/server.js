const Amadeus = require("amadeus");
const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var http = require("http").createServer(app);
var parse = require("socket.io")(http);

let confirmOrder = "";

app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(express.json());

var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

app.get(`/citySearch`, async (req, res) => {
  console.log(req.query);
  var keywords = req.query.keyword;
  const response = await amadeus.referenceData.locations
    .get({
      keyword: keywords,
      subType: "CITY,AIRPORT",
    })
    .catch((x) => console.log(x));
  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

app.post("/date", async function (req, res) {
  console.log(req.body);
  departure = req.body.departure;
  arrival = req.body.arrival;
  locationDeparture = req.body.locationDeparture;
  locationArrival = req.body.locationArrival;

  const response = await amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: locationDeparture,
      destinationLocationCode: locationArrival,
      departureDate: departure,
      adults: "1",
    })
    .catch((err) => console.log(err));

  try {
    await res.json(JSON.parse(response.body));
  } catch (err) {
    await res.json(err);
  }
});

app.post("/flightprice", async function (req, res) {
  res.json(req.body);
  inputFlight = req.body;
  console.log(req.body);

  const responsePricing = await amadeus.shopping.flightOffers.pricing
    .post(
      JSON.stringify({
        data: {
          type: "flight-offers-pricing",
          flightOffers: inputFlight,
        },
      })
    )
    .catch((err) => console.log(err));

  try {
    await res.json(JSON.parse(responsePricing.body));
  } catch (err) {
    await res.json(err);
  }
});

app.post("/flightCreateOrder", async function (req, res) {
  res.json(req.body);

  let inputFlightCreateOrder = req.body;
  console.log(req.body);
  const returnBokkin = amadeus.booking.flightOrders
    .post(
      JSON.stringify({
        data: {
          type: "flight-order",
          flightOffers: [inputFlightCreateOrder],
          travelers: [
            {
              id: "1",
              dateOfBirth: "2012-10-11",
              gender: "FEMALE",
              contact: {
                emailAddress: "jorge.gonzales833@telefonica.es",
                phones: [
                  {
                    deviceType: "MOBILE",
                    countryCallingCode: "34",
                    number: "480080076",
                  },
                ],
              },
              name: {
                firstName: "ADRIANA",
                lastName: "GONZALES",
              },
            },
          ],
        },
      })
    )
    .then(function (response) {
      console.log(response.result);
      confirmOrder = response.result;
    })
    .catch(function (responseError) {
      console.log(responseError);
    });
});

app.get("/flightcretaeorderget", function (req, res) {
  res.send(JSON.stringify(confirmOrder));
});

var server = app.listen(process.env.PORT || 2800, () => {
  console.log("Howdy, I am running at PORT 2800");
});

let io = socket(server);

io.on("connection", function (socket) {
  console.log("Socket Connection Established with ID :" + socket.id);
});
