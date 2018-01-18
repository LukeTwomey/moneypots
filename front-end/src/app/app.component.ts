import { Component } from '@angular/core';
import { Pot } from './pot.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pots = [];

  addNewPotActive = false;
  summaryActive = true;
  depositFundsActive = false;
  withdrawFundsActive = false;

  depositFunds(){
    this.depositFundsActive = true;
    this.summaryActive = false;
  }

  withdrawFunds(){
    this.withdrawFundsActive = true;
    this.summaryActive = false;
  }

  returnToSummary(){
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.summaryActive = true;
  }

  // displaySummary(){
  //   if (this.summaryActive == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // displayDeposit(){
  //   if (this.depositFundsActive == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // displayWithdraw(){
  //   if (this.withdrawFundsActive == true) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  confirmDeposit(depositAmount){
    this.potBalance += parseFloat(depositAmount);
    this.returnToSummary();
  }

  confirmWithdrawal(withdrawalAmount){
    this.potBalance -= parseFloat(withdrawalAmount);
    this.returnToSummary();
  }

  createPot(potDetails) {
    this.pots.push(new Pot(potDetails.value));
    console.log(this.pots);
    this.addNewPotActive = false;
  }

}










