import { Component } from '@angular/core';
import { PotService } from '../pot.service';
import { Pot } from './shared/pot.model';

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
    this.pots = this.potService.getPots();
  }

  createPot(potDetails) {
    this.potService.createPot(potDetails);
    this.addNewPotActive = false;
  }

  deletePot(potId) {
    this.potService.deletePot(potId);
    this.getPots();
  }

}










