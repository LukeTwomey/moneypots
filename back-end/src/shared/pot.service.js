
import Pot from './pot.model.js';

var pots = [
  {
    "id": 0,
    "name": "Holiday Fund",
    "accountName": "Halifax Current Account",
    "balance": 0,
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
  },
  {
    "id": 1,
    "name": "New Car",
    "accountName": "Monzo",
    "balance": 0,
    "target": 10000,
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

// Search the pots array and return the index for the pot object you want to update
function getArrayIndex(pot) {
  var potId = pot.id;
  var potToUpdate = pots.findIndex(function(pot) {
    return pot.id === potId;
  })
  return potToUpdate;
}
