import { Injectable } from '@angular/core';
import { Pot } from './pots/shared/pot.model';

@Injectable()
export class PotService {
  pots = [];

  getPots() {
    return this.pots;
  }

  createPot(potDetails) {
    this.pots.push(new Pot(potDetails.value));
    console.log("Service here. Added pot. Here is what I have now:");
    console.log(this.pots);
  }

  deletePot(potId) {
    this.pots = this.pots.filter(function(el) {
        return el.id !== potId;
    });
    console.log("Service here. Deleted pot. Here is what I have now:");
    console.log(this.pots);
  }

}
