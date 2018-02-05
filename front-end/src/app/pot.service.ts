import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class PotService {

  constructor(private http: HttpClient) {}

  getPots(): Observable<any> {
    return this.http.get('http://localhost:4100/api/pots')
      .do(data => console.log('Data returned from API: ' + JSON.stringify(data)));
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
