import { Observable } from "rxjs/Observable";
import { Component } from '@angular/core';
import { PotService } from '../pot.service';
import { Pot } from './shared/pot.model';

@Component({
  selector: 'pots-list',
  templateUrl: './pot.component.html'
})
export class PotComponent {
  pots = [];
  // public pots$: Observable<any>;
  addNewPotActive = false;

  constructor(private potService: PotService) {}

  ngOnInit() {
    this.getPots();
  }

  getPots() {
    // this.pots = this.potService.getPots();

    // let temp = this.potService.getPots();
    // console.log(temp);

    console.log("Here");
    this.potService.getPots()
      .subscribe(pots => this.pots = pots);
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










