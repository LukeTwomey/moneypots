
var id = 1;

class Pot {

  constructor(potDetails) {
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
      this.preventWithdraw = true; // User should be prevented from withdrawing more than what is currently in the pot
    }
  }

  changeProgressBarColor() {
    if(this.balance >= this.target) {
      this.progressBarColor = '#f8c40e';
    } else {
      this.progressBarColor = '#06b127';
    }
  }

}
