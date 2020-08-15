import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

declare var $: any;

@Injectable()
export class ObservablesService {
  // spinner
  private spinnerStatus = new BehaviorSubject(false);
  spinnerStatusObservable = this.spinnerStatus.asObservable();


  constructor(private router: Router) {}


  updateSpinnerStatus(status) {
    this.spinnerStatus.next(status);
  }



  displaySnackbar(message) {
    $("#snackbar").addClass("show");
    $("#snackbar").html(message);
    setTimeout(() => {
      $("#snackbar").removeClass("show");
    }, 3000);
  }



}
