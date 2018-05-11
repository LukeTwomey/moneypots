import { Observable } from "rxjs/Observable";
import { Component } from '@angular/core';
import { PotService } from './pot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private potService: PotService) {}

  apiUrl = 'http://localhost:4100/';
  pots = [];
  addNewPotActive = false;
  userSelectedIcon = '';
  icons = [];

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

  deposit(data) {  
    this.potService.deposit(data.potDetails, data.depositAmount)
      .subscribe(pots => {this.pots = pots}, (err) => {}, () => {this.updateProgressBar(data.potDetails);});
    this.returnToSummary(data.potDetails);
  }

  withdraw(data) {
    var potToUpdate = this.getArrayIndex(data.potDetails);
    if(this.pots[potToUpdate].balance - parseFloat(data.withdrawalAmount) >= 0) {
      this.potService.withdraw(data.potDetails, data.withdrawalAmount)
        .subscribe(pots => {this.pots = pots}, (err) => {}, () => {this.updateProgressBar(data.potDetails);});
      this.updateProgressBar(data.potDetails);
      this.returnToSummary(data.potDetails);
    } else {
      // User should be prevented from withdrawing more than what is currently in the pot
      this.pots[potToUpdate].preventWithdraw = true; 
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
    var potToUpdate = this.getArrayIndex(pot);

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
    var potId = pot._id;
    var potToUpdate = this.pots.findIndex(function(pot) {
      return pot._id === potId;
    })
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

  changeSettings(potDetails) {
    var potToUpdate = this.getArrayIndex(potDetails);
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










