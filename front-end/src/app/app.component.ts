import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  potName = 'Holiday fund';
  potBalance = 0;
  potIcon = 'assets/holiday.png';
  progress = 'assets/progress-bar.jpg';

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
    var deposit = parseFloat(depositAmount);//.toFixed(2);

    console.log(deposit);
    console.log(this.potBalance);

    console.log(typeof deposit);
    console.log(typeof this.potBalance);

    this.potBalance += deposit;
    parseFloat(this.potBalance);
    console.log(this.potBalance);
    this.returnToSummary();
  }

  confirmWithdrawal(withdrawalAmount){
    this.potBalance -= parseFloat(withdrawalAmount).toFixed(2);
    this.returnToSummary();
  }

}
