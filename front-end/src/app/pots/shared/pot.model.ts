var id = 1;

export class Pot {

  id: number;
  name: string;
  accountName: string;
  balance: number;
  target: number;
  icon: string;
  progress: number;
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
    this.summaryActive = true;
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.settingsActive = false;
    this.deleteActive = false;
    this.preventWithdraw = false;
  }

  getBalance() {
    return this.balance.toFixed(2);
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

      var startPoint = this.progress;
      var endPoint;

      // If you deposit more than the target, then the endPoint will always be 100
      if(this.balance/this.target <= 1) {
        endPoint = Math.floor((this.balance/this.target) * 100);
      } else {
        endPoint = 100;
      }

      // Keep updating the progress value for the pot, until it reaches the current balance
      var self = this;
      var interval = setInterval(function(){
        startPoint++;
        self.progress = startPoint;
        if(self.progress == endPoint) {
          clearInterval(interval);
        }
      }, 10);
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

}
