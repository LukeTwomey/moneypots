import { Component } from '@angular/core';
import { Pot } from './pot.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pots = [];

  addNewPotActive = false;

  createPot(potDetails) {
    this.pots.push(new Pot(potDetails.value));
    console.log(this.pots);
    this.addNewPotActive = false;
  }

  deletePot(potName) {
    this.pots = this.pots.filter(function(el) {
        return el.name !== potName;
    });

    console.log(this.pots);
  }

}










