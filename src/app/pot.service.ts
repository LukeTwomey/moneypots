import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class PotService {

  constructor(private http: HttpClient) {}

  getPots(): Observable<any> {
    return this.http.get('https://moneypots-api.herokuapp.com/api/pots/getPots');
  }

  getIcons(): Observable<any> {
    return this.http.get('https://moneypots-api.herokuapp.com/api/pots/getIcons');
  }

  createPot(potDetails): Observable<any> {
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/createPot', potDetails.value);
  }

  deletePot(potDetails): Observable<any> {
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/deletePot', potDetails);
  }

  deposit(potDetails, depositAmount): Observable<any> {
    var body = {
      potDetails: potDetails,
      depositAmount: depositAmount
    };
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/deposit', body);
  }

  withdraw(potDetails, withdrawalAmount): Observable<any> {
    var body = {
      potDetails: potDetails,
      withdrawalAmount: withdrawalAmount
    };
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/withdraw', body);
  }

  updateSettings(potDetails): Observable<any> {
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/updateSettings', potDetails);
  }

  updateProgress(potDetails): Observable<any> {
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/updateProgress', potDetails);
  }

  updateProgressBarColor(potDetails): Observable<any> {
    return this.http.post('https://moneypots-api.herokuapp.com/api/pots/updateProgressBarColor', potDetails);
  }

}
