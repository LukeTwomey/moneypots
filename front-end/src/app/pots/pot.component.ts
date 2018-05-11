// import { Observable } from "rxjs/Observable";
import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { PotService } from '../pot.service';

@Component({
  selector: 'pots-list',
  templateUrl: './pot.component.html'
})
export class PotComponent {
  // constructor(private potService: PotService) {}
  @Input() pots:any;
  @Input() apiUrl:any;
  @Input() icons:any;
  @Output() submitDeposit = new EventEmitter();
  @Output() submitWithdrawal = new EventEmitter();
  @Output() submitSettings = new EventEmitter();
  @Output() submitSettingsConfirm = new EventEmitter();
  @Output() submitDelete = new EventEmitter();
  @Output() submitProgress = new EventEmitter();
  @Output() submitProgressColor = new EventEmitter();
  @Output() stateDepositFunds = new EventEmitter();
  @Output() stateWithdrawFunds = new EventEmitter();
  @Output() stateReturnToSummary = new EventEmitter();
  @Output() stateDeleteConfirm = new EventEmitter();
  @Output() stateReturnToSettings = new EventEmitter();

  deposit(potDetails, depositAmount) {
    var data = {potDetails, depositAmount};
    this.submitDeposit.emit(data);
  }

  withdraw(potDetails, withdrawalAmount) {
    var data = {potDetails, withdrawalAmount};
    this.submitWithdrawal.emit(data);
  }

  updateSettings(potDetails) {
    this.submitSettings.emit(potDetails);
  }

  deletePot(potDetails) {
    this.submitDelete.emit(potDetails);
  }

  updateProgressBar(pot) {
    this.submitProgress.emit(pot);
  }

  changeProgressBarColor(pot) {
    this.submitProgressColor.emit(pot);
  }

  changeSettings(pot) {
    this.submitSettingsConfirm.emit(pot);
  }

  // State change methods
  depositFunds(pot) {
    this.stateDepositFunds.emit(pot);
  }

  withdrawFunds(pot) {
    this.stateWithdrawFunds.emit(pot);
  }

  returnToSummary(pot) {
    this.stateReturnToSummary.emit(pot);
  }

  deleteConfirm(pot) {
    this.stateDeleteConfirm.emit(pot);
  }

  returnToSettings(pot) {
    this.stateReturnToSettings.emit(pot);
  }

}










