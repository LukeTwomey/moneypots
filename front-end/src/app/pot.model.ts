export class Pot {

  name: string;
  accountName: string;
  balance: number;
  icon: string;
  progress: string;

  summaryActive: boolean;
  depositFundsActive: boolean;
  withdrawFundsActive: boolean;

  constructor(potDetails:any) {
    this.name = potDetails.name;
    this.accountName = potDetails.accountName;
    this.balance = 0;
    this.icon = 'assets/holiday.png';
    this.progress = 'assets/progress-bar.jpg';

    this.summaryActive = true;
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
  }

  getBalance() {
    return this.balance.toFixed(2);
  }

  deposit(depositAmount) {
    this.balance += parseFloat(depositAmount);
    this.returnToSummary();
  }

  withdraw(withdrawalAmount) {
    this.balance -= parseFloat(withdrawalAmount);
    this.returnToSummary();
  }

  returnToSummary(){
    this.depositFundsActive = false;
    this.withdrawFundsActive = false;
    this.summaryActive = true;
  }

  depositFunds(){
    this.depositFundsActive = true;
    this.summaryActive = false;
  }

  withdrawFunds(){
    this.withdrawFundsActive = true;
    this.summaryActive = false;
  }

}
