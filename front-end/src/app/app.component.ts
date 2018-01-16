import { Component } from '@angular/core';
import { Pot } from './pot.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  potName = 'Holiday fund';
  accountName = 'First Direct Current Account';
  potBalance = 0;
  potIcon = 'assets/holiday.png';
  progress = 'assets/progress-bar.jpg';

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

  displaySummary(){
    if (this.summaryActive == true) {
      return true;
    } else {
      return false;
    }
  }

  displayDeposit(){
    if (this.depositFundsActive == true) {
      return true;
    } else {
      return false;
    }
  }

  displayWithdraw(){
    if (this.withdrawFundsActive == true) {
      return true;
    } else {
      return false;
    }
  }

  confirmDeposit(depositAmount){
    this.potBalance += parseFloat(depositAmount);
    this.returnToSummary();
  }

  confirmWithdrawal(withdrawalAmount){
    this.potBalance -= parseFloat(withdrawalAmount);
    this.returnToSummary();
  }

  getPotBalance(){
    return this.potBalance.toFixed(2);
  }

  createPot(potDetails) {
    this.pots.push(new Pot(potDetails.value));
    console.log(this.pots);
    this.addNewPotActive = false;
  }

}










