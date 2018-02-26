
import Pot from './pot.model.js';

var pots = [
  {
    "id": 0,
    "name": "Holiday Fund",
    "accountName": "Halifax Current Account",
    "balance": 0,
    "target": 2000,
    "icon": "holiday.png",
    "progress": 0,
    "progressBarColor": "#06b127",
    "summaryActive": true,
    "depositFundsActive": false,
    "withdrawFundsActive": false,
    "settingsActive": false,
    "deleteActive": false,
    "preventWithdraw": false,
  },
  {
    "id": 1,
    "name": "New Car",
    "accountName": "Monzo",
    "balance": 0,
    "target": 10000,
    "icon": "car.png",
    "progress": 0,
    "progressBarColor": "#06b127",
    "summaryActive": true,
    "depositFundsActive": false,
    "withdrawFundsActive": false,
    "settingsActive": false,
    "deleteActive": false,
    "preventWithdraw": false,
  },
  {
    "id": 2,
    "name": "Mortgage Deposit",
    "accountName": "Lloyds TSB",
    "balance": 0,
    "target": 50000,
    "icon": "home.png",
    "progress": 0,
    "progressBarColor": "#06b127",
    "summaryActive": true,
    "depositFundsActive": false,
    "withdrawFundsActive": false,
    "settingsActive": false,
    "deleteActive": false,
    "preventWithdraw": false,
  }
];

export function getPots(){
  return pots;
}

export function createPot(potDetails){
  pots.push(new Pot(potDetails));
  return pots;
}

export function deletePot(potDetails){
  var potToDelete = getArrayIndex(potDetails);
  pots.splice(potToDelete, 1);
  return pots;
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
