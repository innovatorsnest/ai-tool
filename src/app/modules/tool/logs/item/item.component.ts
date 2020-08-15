import { Component, OnInit, Input } from '@angular/core';
import tippy from 'tippy.js';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  isThumsup = '';

  @Input() logs;

  constructor() { }

  ngOnInit() {
  }

  makeSuggestion(suggestion, log) {
    console.log('suggestion here', suggestion)
    console.log('log', log)
    // this.isThumsup = suggestion;

    const payload = {

      _id: "5f37aef1737dba243a739104",
      updates: {
        intent: "master off",
        entities: log ,
      good: true,
      bad: false,
      annotated: true,
      non_annotated: false
    }

  }
}

}
