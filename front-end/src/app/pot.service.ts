import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class PotService {

  constructor(private http: HttpClient) {}

  getPots(): Observable<any> {
    return this.http.get('http://localhost:4100/api/pots/getPots')
      .do(data => console.log('Data returned from API: ' + JSON.stringify(data)));
  }

  createPot(potDetails): Observable<any> {
    // this.pots.push(new Pot(potDetails.value));
    console.log("Service here. Adding pot...");
    return this.http.post('http://localhost:4100/api/pots/createPot', potDetails.value);
  }

  // deletePot(potId) {
  //   this.pots = this.pots.filter(function(el) {
  //       return el.id !== potId;
  //   });
  //   console.log("Service here. Deleted pot. Here is what I have now:");
  //   console.log(this.pots);
  // }

}
