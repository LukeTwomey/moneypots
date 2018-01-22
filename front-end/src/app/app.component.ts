import { Component } from '@angular/core';
import { PotService } from './pot.service';
import { Pot } from './pots/shared/pot.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // pots = [];
  pots;

  addNewPotActive = false;

  constructor(private potService: PotService) {
    console.log("App running...");
    // inject service here. this will let me create/delete pots.
    // move the array push into where the actual array is - the pot service
    // move the array out of the pot component. that is no longer where the pots will rreside
    // the pot component will simply get the pots from the service. the SERVICE is where the array is held.
  }

  ngOnInit() {
    this.getPots();
    console.log("App here, asking for pots data from the service:");
    console.log(this.pots);
  }

  getPots() {
    this.pots = this.potService.getPots();
  }



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










