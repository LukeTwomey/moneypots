
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

// MongoDB
mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost/pots');

promise.then(function(db) {
  console.log('MONGO CONNECTED');
}).catch(function(err) {
  console.log('CONNECTION ERROR', err);
});

// Schema set up
var potSchema = mongoose.Schema({
  name: String,
  accountName: String,
  balance: Number,
  target: Number,
  icon: String,
  progress: Number,
  progressBarColor: String,
  summaryActive: Boolean,
  depositFundsActive: Boolean,
  withdrawFundsActive: Boolean,
  settingsActive: Boolean,
  deleteActive: Boolean,
  preventWithdraw: Boolean,
});

// Compile schema into a model
var Pot = mongoose.model('Pot', potSchema);

export function getPots(callback){
  Pot.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      callback(result);
    }
  });
}

export function createPot(potDetails){
  pots.push(new Pot(potDetails));
  return pots;
}

export function deletePot(potDetails, callback){
  Pot.deleteOne({_id: ObjectId(potDetails._id)}, function(err, result) {
    if (err) {
    } else {
      callback();
    }
  });
}

export function deposit(body){
  var potToUpdate = getArrayIndex(body.potDetails);
  var depositAmount = body.depositAmount;
  pots[potToUpdate].balance += parseFloat(depositAmount);
  return pots;
}

export function withdraw(body){
  var potToUpdate = getArrayIndex(body.potDetails);
  var withdrawalAmount = body.withdrawalAmount;
  pots[potToUpdate].balance -= parseFloat(withdrawalAmount);
  return pots;
}

export function updateSettings(potDetails){
  var potToUpdate = getArrayIndex(potDetails);

  // Loop through and replace each object value with the updated one from the front-end
  for (var key in potDetails) {
    var value = potDetails[key];
    pots[potToUpdate][key] = value;
  }

  return pots;
}

export function updateProgress(potDetails){
  var potToUpdate = getArrayIndex(potDetails);
  pots[potToUpdate].progress = potDetails.progress;
}

export function updateProgressBarColor(potDetails){
  var potToUpdate = getArrayIndex(potDetails);
  pots[potToUpdate].progressBarColor = potDetails.progressBarColor;
}

// Search the pots array and return the index for the pot object you want to update
function getArrayIndex(pot) {
  var potId = pot.id;
  var potToUpdate = pots.findIndex(function(pot) {
    return pot.id === potId;
  })
  return potToUpdate;
}
