
import { Pot } from './pot.model.js';

var pots = [
  {
    "id": 0,
    "name": "Holiday Fund",
    "accountName": "Halifax Current Account",
    "balance": 4865.86578989090999999,
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
    "balance": 250.33,
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
  console.log("Back end service has been called...");
  console.log(potDetails);
  this.pots.push(new Pot(potDetails));
}
