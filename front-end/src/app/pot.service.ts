import { Injectable } from '@angular/core';
import { Pot } from './pots/shared/pot.model';

@Injectable()
export class PotService {
  pots = [];

  constructor() {
    console.log("Pot service starting...");
  }

  getPots() {
    return this.pots;
  }

  // createPot(potDetails) {
  //   this.pots.push(new Pot(potDetails.value));
  //   console.log(this.pots);
  //   // this.addNewPotActive = false;
  // }

  // deletePot(potName) {
  //   this.pots = this.pots.filter(function(el) {
  //       return el.name !== potName;
  //   });

  //   console.log(this.pots);
  // }

}
