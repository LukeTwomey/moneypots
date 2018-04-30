
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
  name: { type: String, default: '' },
  accountName: { type: String, default: '' },
  balance: { type: Number, default: 0 },
  target: { type: Number, default: 0 },
  icon: { type: String, default: '' },
  progress: { type: Number, default: 0 },
  progressBarColor: { type: String, default: '#06b127' },
  summaryActive: { type: Boolean, default: true },
  depositFundsActive: { type: Boolean, default: false },
  withdrawFundsActive: { type: Boolean, default: false },
  settingsActive: { type: Boolean, default: false },
  deleteActive: { type: Boolean, default: false },
  preventWithdraw: { type: Boolean, default: false },
});

// Compile schema into a model
var Pot = mongoose.model('Pot', potSchema);

export function getPots(callback){
  Pot.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Here are your pots:");
      console.log(result);
      callback(result);
    }
  });
}

export function createPot(potDetails, callback){
  var newPot = new Pot(potDetails);
  newPot.save(function(err, result) {
    if(err) {
      console.log(err);
    } else {
      callback();
    }
  });
}

export function deletePot(potDetails, callback){
  Pot.deleteOne({_id: ObjectId(potDetails._id)}, function(err, result) {
    if (err) {
      console.log(err);
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

export function updateSettings(potDetails, callback){
  console.log("Update settings with these pot details:");
  console.log(potDetails);
  // var potToUpdate = getArrayIndex(potDetails);

  // // Loop through and replace each object value with the updated one from the front-end
  // for (var key in potDetails) {
  //   var value = potDetails[key];
  //   pots[potToUpdate][key] = value;
  // }

  // return pots;

  // Pot.update({_id: ObjectId(potDetails._id)}, {potDetails}, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("I just tried to update the record in the database, and this is the result:");
  //     console.log(result);
  //     callback();
  //   }
  // });

  Pot.update(
    {_id: ObjectId(potDetails._id)}, 
    { 
      name: potDetails.name,
      accountName: potDetails.accountName,
      balance: potDetails.balance,
      target: potDetails.target,
      icon: potDetails.icon,
      progress: potDetails.progress,
      progressBarColor: potDetails.progressBarColor,
      summaryActive: potDetails.summaryActive,
      depositFundsActive: potDetails.depositFundsActive,
      withdrawFundsActive: potDetails.withdrawFundsActive,
      settingsActive: potDetails.settingsActive,
      deleteActive: potDetails.deleteActive,
      preventWithdraw: potDetails.preventWithdraw
    },
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("I just tried to update the record in the database, and this is the result:");
      console.log(result);
      callback();
    }
  });
}

export function updateProgress(potDetails, callback){
  console.log("Update progress");
  // var potToUpdate = getArrayIndex(potDetails);
  // pots[potToUpdate].progress = potDetails.progress;
  // Pot.update({_id: ObjectId(potDetails._id)}, {potDetails}, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     callback();
  //   }
  // });  
  Pot.update(
    {_id: ObjectId(potDetails._id)}, 
    { 
      progress: potDetails.progress
    },
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("I just tried to update the record's progress in the database, and this is the result:");
      console.log(result);
      callback();
    }
  });
}

export function updateProgressBarColor(potDetails, callback){
  console.log("Update progress bar colour");
  // var potToUpdate = getArrayIndex(potDetails);
  // pots[potToUpdate].progressBarColor = potDetails.progressBarColor;
  // Pot.update({_id: ObjectId(potDetails._id)}, {potDetails}, function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     callback();
  //   }
  // });  
  Pot.update(
    {_id: ObjectId(potDetails._id)}, 
    { 
      progressBarColor: potDetails.progressBarColor
    },
   function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("I just tried to update the record's progress bar COLOUR in the database, and this is the result:");
      console.log(result);
      callback();
    }
  });
}

// Search the pots array and return the index for the pot object you want to update
function getArrayIndex(pot) {
  var potId = pot.id;
  var potToUpdate = pots.findIndex(function(pot) {
    return pot.id === potId;
  })
  return potToUpdate;
}
