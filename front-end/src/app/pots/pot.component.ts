import { Component } from '@angular/core';
import { Pot } from './shared/pot.model';

@Component({
  selector: 'pots-list',
  templateUrl: './pot.component.html'
})
export class PotComponent {
  pots = [];

  // addNewPotActive = false;

  // createPot(potDetails) {
  //   this.pots.push(new Pot(potDetails.value));
  //   console.log(this.pots);
  //   this.addNewPotActive = false;
  // }

  // deletePot(potName) {
  //   this.pots = this.pots.filter(function(el) {
  //       return el.name !== potName;
  //   });
  //   console.log(this.pots);
  // }

}










