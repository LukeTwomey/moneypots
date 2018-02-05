
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 4100;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.get('/pots', function(req, res) {
  console.log("Server: received request from the front-end...");
  res.json([
      {
        "id": 1,
        "name": "Holiday Fund",
        "accountName": "Halifax Current Account",
        "balance": 47.47,
        "target": 2000,
        "icon": "assets/holiday.png",
        "progress": 0,
        "progressBarColor": "#06b127",
        "summaryActive": true,
        "depositFundsActive": false,
        "withdrawFundsActive": false,
        "settingsActive": false,
        "deleteActive": false,
        "preventWithdraw": false,
      }
    ]);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
