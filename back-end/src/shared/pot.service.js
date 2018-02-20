
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
  var potId = potDetails.id;

  // Get the array index for the pot object with the matching pot ID to delete
  var potToDelete = pots.findIndex(function(pot) {
    return pot.id === potId;
  })

  // Remove that element from the pots array
  pots.splice(potToDelete, 1);
  return pots;
}
