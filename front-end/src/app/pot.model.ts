export class Pot {

  name: string;
  accountName: string;
  balance: number;
  target: number;
  icon: string;
  progress: number;
  summaryActive: boolean;
  depositFundsActive: boolean;
  withdrawFundsActive: boolean;

  constructor(potDetails:any) {
    this.name = potDetails.name;
    this.accountName = potDetails.accountName;
    this.balance = 0;
    this.target = potDetails.target ? potDetails.target : 0;
    this.icon = 'assets/holiday.png';
    this.progress = 0;
    this.summaryActive = true;
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
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
    this.balance -= parseFloat(withdrawalAmount);
    this.updateProgressBar();
    this.returnToSummary();
  }

  returnToSummary() {
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.summaryActive = true;
  }

  depositFunds() {
    this.depositFundsActive = true;
    this.summaryActive = false;
  }

  withdrawFunds() {
    this.withdrawFundsActive = true;
    this.summaryActive = false;
  }

  updateProgressBar() {
    this.progress = (this.balance/this.target) * 100;
  }

}
