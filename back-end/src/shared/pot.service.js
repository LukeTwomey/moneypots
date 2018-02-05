
import { Pot } from './pot.model.js';

var pots = [
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
  },
  {
    "id": 2,
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
