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
    return this.http.post('http://localhost:4100/api/pots/createPot', potDetails.value);
  }

  deletePot(potDetails): Observable<any> {
    return this.http.post('http://localhost:4100/api/pots/deletePot', potDetails);
  }

  deposit(potDetails, depositAmount): Observable<any> {
    var body = {
      potDetails: potDetails,
      depositAmount: depositAmount
    };
    return this.http.post('http://localhost:4100/api/pots/deposit', body);
  }

  withdraw(potDetails, withdrawalAmount): Observable<any> {
    var body = {
      potDetails: potDetails,
      withdrawalAmount: withdrawalAmount
    };
    return this.http.post('http://localhost:4100/api/pots/withdraw', body);
  }

}
