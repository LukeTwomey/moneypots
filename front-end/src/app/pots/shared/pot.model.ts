var id = 1;

export class Pot {

  id: number;
  name: string;
  accountName: string;
  balance: number;
  target: number;
  icon: string;
  progress: number;
  progressBarColor: string;
  summaryActive: boolean;
  depositFundsActive: boolean;
  withdrawFundsActive: boolean;
  settingsActive: boolean;
  deleteActive: boolean;
  preventWithdraw: boolean;

  constructor(potDetails:any) {
    this.id = id++;
    this.name = potDetails.name;
    this.accountName = potDetails.accountName;
    this.balance = 0;
    this.target = potDetails.target ? potDetails.target : 0;
    this.icon = 'assets/holiday.png';
    this.progress = 0;
    this.progressBarColor = '#06b127';
    this.summaryActive = true;
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.settingsActive = false;
    this.deleteActive = false;
    this.preventWithdraw = false;
  }

  getBalance() {
    return this.numberWithCommas(this.balance.toFixed(2));
  }

  getTarget() {
    return this.numberWithCommas(this.target.toFixed(2));
  }

  deposit(depositAmount) {
    this.balance += parseFloat(depositAmount);
    this.updateProgressBar();
    this.returnToSummary();
  }

  withdraw(withdrawalAmount) {
    if(this.balance - parseFloat(withdrawalAmount) >= 0) {
      this.balance -= parseFloat(withdrawalAmount);
      this.updateProgressBar();
      this.returnToSummary();
    } else {
      this.preventWithdraw = true;
    }
  }

  returnToSummary() {
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.settingsActive = false;
    this.summaryActive = true;
    this.preventWithdraw = false;
  }

  returnToSettings() {
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.settingsActive = true;
    this.deleteActive = false;
  }

  depositFunds() {
    this.depositFundsActive = true;
    this.summaryActive = false;
  }

  withdrawFunds() {
    this.withdrawFundsActive = true;
    this.summaryActive = false;
  }

  changeSettings() {
    this.settingsActive = true;
    this.summaryActive = false;
  }

  updateProgressBar() {

    // Only update the progress bar if a pot target has been set
    if(this.target > 0) {

      var self = this;
      var startPoint = this.progress;
      var endPoint;
      var progressBarDirection;

      // Endpoint value is where the progress bar needs to end up
      if(this.balance == 0) {
        endPoint = 0;
      } else if(this.balance/this.target <= 1) {
        endPoint = Math.round((this.balance/this.target) * 100);
      } else {
        endPoint = 100;
      }

      if(endPoint == startPoint) { // No deposit or withdrawal has been made, and the pot target has not been changed
        this.changeProgressBarColor();
        return
      } else if(endPoint > startPoint) { // Deposit made, or pot target reduced
        progressBarDirection = 'up';
      } else { // Withdrawal made, or pot target increased
        progressBarDirection = 'down';
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

  changeProgressBarColor() {
    if(this.balance >= this.target) {
      this.progressBarColor = '#f8c40e';
    } else {
      this.progressBarColor = '#06b127';
    }
  }

  updateSettings() {
    this.updateProgressBar();
    this.returnToSummary();
  }

  deleteConfirm() {
    this.settingsActive = false;
    this.deleteActive = true;
  }

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
