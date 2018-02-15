import { Observable } from "rxjs/Observable";
import { Component } from '@angular/core';
import { PotService } from '../pot.service';

@Component({
  selector: 'pots-list',
  templateUrl: './pot.component.html'
})
export class PotComponent {
  pots = [];
  addNewPotActive = false;

  constructor(private potService: PotService) {}

  ngOnInit() {
    this.getPots();
  }

  getPots() {
    this.potService.getPots()
      .subscribe(pots => this.pots = pots);
  }

  depositFunds(pot) {
    console.log("You're calling me to deposit. Here's the pot ID I have: ");
    console.log(pot.id);
    console.log(this.pots);
    this.pots[pot.id].depositFundsActive = true;
    this.pots[pot.id].summaryActive = false;
  }

  withdrawFunds(pot) {
    console.log("You're calling me to withdraw. Here's the pot ID I have: ");
    console.log(pot.id);
    console.log(this.pots);
    this.pots[pot.id].withdrawFundsActive = true;
    this.pots[pot.id].summaryActive = false;
  }

  returnToSummary(pot) {
    this.pots[pot.id].depositFundsActive = false;
    this.pots[pot.id].withdrawFundsActive = false;
    this.pots[pot.id].settingsActive = false;
    this.pots[pot.id].summaryActive = true;
    this.pots[pot.id].preventWithdraw = false;
  }

  changeSettings(pot) {
    this.pots[pot.id].settingsActive = true;
    this.pots[pot.id].summaryActive = false;
  }

  updateSettings(pot) {
    console.log("Updating settings..." + pot.id);
    this.updateProgressBar(pot);
    this.returnToSummary(pot);
  }

  deleteConfirm(pot) {
    this.pots[pot.id].settingsActive = false;
    this.pots[pot.id].deleteActive = true;
  }

  returnToSettings(pot) {
    this.pots[pot.id].depositFundsActive = false;
    this.pots[pot.id].withdrawFundsActive = false;
    this.pots[pot.id].settingsActive = true;
    this.pots[pot.id].deleteActive = false;
  }

  // createPot(potDetails) {
  //   this.potService.createPot(potDetails);
  //   this.addNewPotActive = false;
  // }

  deletePot(pot) {
    console.log("Deleting pot..." + pot.id);
    // this.potService.deletePot(potId);
    // this.getPots();
  }

  updateProgressBar(pot) {

    // Only update the progress bar if a pot target has been set
    if(this.pots[pot.id] > 0) {

      var self = this.pots[pot.id];
      var startPoint = this.pots[pot.id].progress;
      var endPoint;
      var progressBarDirection;

      // Endpoint value is where the progress bar needs to end up
      if(this.pots[pot.id].balance == 0) {
        endPoint = 0;
      } else if(this.pots[pot.id].balance/this.pots[pot.id].target <= 1) {
        endPoint = Math.round((this.pots[pot.id].balance/this.pots[pot.id].target) * 100);
      } else {
        endPoint = 100;
      }

      if(endPoint == startPoint) { // No deposit or withdrawal has been made, and the pot target has not been changed
        this.pots[pot.id].changeProgressBarColor();
        return
      } else if(endPoint > startPoint) { // Deposit made, or pot target reduced
        progressBarDirection = 'up';
      } else { // Withdrawal made, or pot target increased
        progressBarDirection = 'down';
        this.pots[pot.id].changeProgressBarColor();
      }

      // Repeat setInterval until progress bar is in correct position
      var interval = setInterval(function(){

        if(progressBarDirection == 'up') {
          startPoint++;
        } else {
          startPoint--;
        }

        self.progress = startPoint;

        if(self.progress == endPoint) {
          clearInterval(interval);
          self.changeProgressBarColor();
        }
      }, 15);

    }
  }

}










