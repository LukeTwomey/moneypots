import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  potName = 'Holiday fund';
  potBalance = '£471.73';
  potIcon = 'assets/holiday.png';
  progress = 'assets/progress-bar.jpg';
  manageFundsActive = false;

  depositFunds(){
    console.log("deposit");
    this.manageFundsActive = true;
  }

  withdrawFunds(){
    console.log("withdraw");
    this.manageFundsActive = true;
  }

  returnToSummary(){
    this.manageFundsActive = false;
  }

  displaySummary(){
    if (this.manageFundsActive == false) {
      return true;
    } else {
      return false;
    }
  }

  manageFunds(){
    if (this.manageFundsActive == true) {
      return true;
    } else {
      return false;
    }
  }
}
