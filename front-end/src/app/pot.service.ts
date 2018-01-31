import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Pot } from './pots/shared/pot.model';

@Injectable()
export class PotService {

  constructor(private http: Http) {}

  getPots() {
    console.log("Pot service: requesting pots from API...");
    this.http.get("http://localhost:8080/api/pots");
  }

  // createPot(potDetails) {
  //   this.pots.push(new Pot(potDetails.value));
  //   console.log("Service here. Added pot. Here is what I have now:");
  //   console.log(this.pots);
  // }

  // deletePot(potId) {
  //   this.pots = this.pots.filter(function(el) {
  //       return el.id !== potId;
  //   });
  //   console.log("Service here. Deleted pot. Here is what I have now:");
  //   console.log(this.pots);
  // }

}
