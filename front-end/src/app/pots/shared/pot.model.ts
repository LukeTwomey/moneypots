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
    if(this.target > 0) {
      this.progress = (this.balance/this.target) * 100;
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
