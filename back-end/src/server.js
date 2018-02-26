
import * as potService from './shared/pot.service';

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

// create static route to allow express to server the static image files used for the pot icons
app.use('/images', express.static('assets'));

var port = process.env.PORT || 4100;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/pots/getPots', function(req, res) {
  res.json(potService.getPots());
});

router.post('/pots/createPot', function(req, res) {
  res.json(potService.createPot(req.body));
});

router.post('/pots/deletePot', function(req, res) {
  res.json(potService.deletePot(req.body));
});

router.post('/pots/deposit', function(req, res) {
  res.json(potService.deposit(req.body));
});

router.post('/pots/withdraw', function(req, res) {
  res.json(potService.withdraw(req.body));
});

router.post('/pots/updateSettings', function(req, res) {
  res.json(potService.updateSettings(req.body));
});

router.post('/pots/updateProgress', function(req, res) {
  res.json(potService.updateProgress(req.body));
});

router.post('/pots/updateProgressBarColor', function(req, res) {
  res.json(potService.updateProgressBarColor(req.body));
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// Output the icons stored on the server
