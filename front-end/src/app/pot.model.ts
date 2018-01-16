export class Pot {

  potName: string;
  accountName: string;
  potBalance: number;
  potIcon: string;
  progress: string;

  constructor(potDetails:any) {
    this.potName = potDetails.potName;
    this.accountName = potDetails.accountName;
    this.potBalance = potDetails.potBalance;
    this.potIcon = 'assets/holiday.png';
    this.progress = 'assets/progress-bar.jpg';
  }

}
