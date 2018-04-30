import { Observable } from "rxjs/Observable";
import { Component } from '@angular/core';
import { PotService } from '../pot.service';

@Component({
  selector: 'pots-list',
  templateUrl: './pot.component.html'
})
export class PotComponent {
  apiUrl = 'http://localhost:4100/';
  pots = [];
  icons = [];
  addNewPotActive = false;
  userSelectedIcon = '';

  constructor(private potService: PotService) {}

  ngOnInit() {
    this.getPots();
    this.getIcons();
  }

  getPots() {
    this.potService.getPots()
      .subscribe(pots => this.pots = pots);
  }

  getIcons() {
    this.potService.getIcons()
      .subscribe(icons => {this.icons = icons}, (err) => {});
  }

  createPot(potDetails) {
    this.potService.createPot(potDetails)
      .subscribe(pots => this.pots = pots);
    this.addNewPotActive = false;
    this.userSelectedIcon = '';
  }

  deposit(potDetails, depositAmount) {
    this.potService.deposit(potDetails, depositAmount)
      .subscribe(pots => {this.pots = pots}, (err) => {}, () => {this.updateProgressBar(potDetails);});
    this.returnToSummary(potDetails);
  }

  withdraw(potDetails, withdrawalAmount) {
    var potToUpdate = this.getArrayIndex(potDetails);
    if(this.pots[potToUpdate].balance - parseFloat(withdrawalAmount) >= 0) {
      this.potService.withdraw(potDetails, withdrawalAmount)
        .subscribe(pots => {this.pots = pots}, (err) => {}, () => {this.updateProgressBar(potDetails);});
      this.updateProgressBar(potDetails);
      this.returnToSummary(potDetails);
    } else {
      this.pots[potToUpdate].preventWithdraw = true; // User should be prevented from withdrawing more than what is currently in the pot
    }
  }

  updateSettings(potDetails) {
    this.returnToSummary(potDetails);
    this.potService.updateSettings(potDetails)
      .subscribe(pots => {this.pots = pots}, (err) => {}, () => {this.updateProgressBar(potDetails);});
  }

  deletePot(potDetails) {
    this.potService.deletePot(potDetails)
      .subscribe(pots => this.pots = pots);
  }

  updateProgressBar(pot) {
    console.log("Updating progress bar");
    console.log(pot);
    var potToUpdate = this.getArrayIndex(pot);
    console.log("Pot index to update:" + potToUpdate);

    // Only update the progress bar if a pot target has been set
    if(this.pots[potToUpdate].target > 0) {

      var self = this;
      var currentPot = this.pots[potToUpdate];
      var startPoint = this.pots[potToUpdate].progress;
      var endPoint;
      var progressBarDirection;

      // Endpoint value is where the progress bar needs to end up
      if(this.pots[potToUpdate].balance == 0) {
        endPoint = 0; // Set the local variable
      } else if(this.pots[potToUpdate].balance/this.pots[potToUpdate].target <= 1) {
        endPoint = Math.round((this.pots[potToUpdate].balance/this.pots[potToUpdate].target) * 100);
      } else {
        endPoint = 100;
      }

      // Update the pot progress in the array, so we can push it through to the back-end to keep track of
      this.pots[potToUpdate].progress = endPoint;
      this.potService.updateProgress(this.pots[potToUpdate])
        .subscribe();

      if(endPoint == startPoint) { // No deposit or withdrawal has been made, and the pot target has not been changed
        this.changeProgressBarColor(pot);
        return
      } else if(endPoint > startPoint) { // Deposit made, or pot target reduced
        progressBarDirection = 'up';
      } else { // Withdrawal made, or pot target increased
        progressBarDirection = 'down';
        this.changeProgressBarColor(pot);
      }

      // Repeat setInterval until progress bar is in correct position
      var interval = setInterval(function(){

        if(progressBarDirection == 'up') {
          startPoint++;
        } else {
          startPoint--;
        }

        currentPot.progress = startPoint;

        if(currentPot.progress == endPoint) {
          clearInterval(interval);
          self.changeProgressBarColor(pot);
        }
      }, 15);

    }
  }

  changeProgressBarColor(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    if(this.pots[potToUpdate].balance >= this.pots[potToUpdate].target) {
      this.pots[potToUpdate].progressBarColor = '#f8c40e';
    } else {
      this.pots[potToUpdate].progressBarColor = '#06b127';
    }

    // Update the pot progress bar colour in the back-end
    this.potService.updateProgressBarColor(this.pots[potToUpdate])
      .subscribe();
  }

  // Search the pots array and return the index for the pot object you want to update
  getArrayIndex(pot) {
    console.log("get array index here");
    console.log(pot);
    var potId = pot._id;
    console.log(potId);
    console.log(this.pots);
    var potToUpdate = this.pots.findIndex(function(pot) {
      return pot._id === potId;
    })
    console.log(potToUpdate);
    return potToUpdate;
  }

  selectIcon(icon) {
    this.userSelectedIcon = icon;
  }

  // State change methods
  depositFunds(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    this.pots[potToUpdate].depositFundsActive = true;
    this.pots[potToUpdate].summaryActive = false;
  }

  withdrawFunds(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    this.pots[potToUpdate].withdrawFundsActive = true;
    this.pots[potToUpdate].summaryActive = false;
  }

  returnToSummary(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    this.pots[potToUpdate].depositFundsActive = false;
    this.pots[potToUpdate].withdrawFundsActive = false;
    this.pots[potToUpdate].settingsActive = false;
    this.pots[potToUpdate].summaryActive = true;
    this.pots[potToUpdate].preventWithdraw = false;
  }

  changeSettings(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    this.pots[potToUpdate].settingsActive = true;
    this.pots[potToUpdate].summaryActive = false;
  }

  deleteConfirm(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    this.pots[potToUpdate].settingsActive = false;
    this.pots[potToUpdate].deleteActive = true;
  }

  returnToSettings(pot) {
    var potToUpdate = this.getArrayIndex(pot);
    this.pots[potToUpdate].depositFundsActive = false;
    this.pots[potToUpdate].withdrawFundsActive = false;
    this.pots[potToUpdate].settingsActive = true;
    this.pots[potToUpdate].deleteActive = false;
  }

}










