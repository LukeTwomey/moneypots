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
      var transactionType;

      // Endpoint value depends on what the balance is
      if(this.balance == 0) {
        endPoint = 0;
      } else if(this.balance/this.target <= 1) {
        endPoint = Math.round((this.balance/this.target) * 100);
      } else {
        endPoint = 100;
      }

      // Transaction type will either be Deposit or Withdrawal
      if(endPoint > this.progress) {
        transactionType = 'deposit';
      } else {
        transactionType = 'withdrawal';
      }

      // Keep updating the progress value for the pot, until it reaches the current balance
      var self = this;
      var interval = setInterval(function(){
        // If transaction is a deposit, then you need to move progress bar up, for withdrawal it needs to go down
        if(transactionType == 'deposit') {
          startPoint++;
        } else {
          startPoint--;
        }

        self.progress = startPoint;

        console.log(startPoint);
        console.log(endPoint);

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
