import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  isThumsup = '';

  constructor() { }

  ngOnInit() {
  }

  makeSuggestion(suggestion) {
    this.isThumsup = suggestion;
  }

}
