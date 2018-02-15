import { Observable } from "rxjs/Observable";
import { Component } from '@angular/core';
import { PotService } from '../pot.service';

@Component({
  selector: 'pots-list',
  templateUrl: './pot.component.html'
})
export class PotComponent {
  pots = [];
  addNewPotActive = false;

  constructor(private potService: PotService) {}

  ngOnInit() {
    this.getPots();
  }

  getPots() {
    this.potService.getPots()
      .subscribe(pots => this.pots = pots);
  }

  depositFunds(pot) {
    console.log("You're calling me to deposit. Here's the pot ID I have: ");
    console.log(pot.id);
    console.log(this.pots);
    this.pots[pot.id].depositFundsActive = true;
    this.pots[pot.id].summaryActive = false;
  }

  withdrawFunds(pot) {
    console.log("You're calling me to withdraw. Here's the pot ID I have: ");
    console.log(pot.id);
    console.log(this.pots);
    this.pots[pot.id].withdrawFundsActive = true;
    this.pots[pot.id].summaryActive = false;
  }

  returnToSummary(pot) {
    this.pots[pot.id].depositFundsActive = false;
    this.pots[pot.id].withdrawFundsActive = false;
    this.pots[pot.id].settingsActive = false;
    this.pots[pot.id].summaryActive = true;
    this.pots[pot.id].preventWithdraw = false;
  }

  // createPot(potDetails) {
  //   this.potService.createPot(potDetails);
  //   this.addNewPotActive = false;
  // }

  // deletePot(potId) {
  //   this.potService.deletePot(potId);
  //   this.getPots();
  // }

}










