export class Pot {

  name: string;
  accountName: string;
  balance: number;
  icon: string;
  progress: string;

  constructor(potDetails:any) {
    this.name = potDetails.name;
    this.accountName = potDetails.accountName;
    this.balance = 0;
    this.icon = 'assets/holiday.png';
    this.progress = 'assets/progress-bar.jpg';
  }

  getBalance() {
    return this.balance.toFixed(2);
  }

}
