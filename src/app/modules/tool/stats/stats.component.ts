import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {


  @Input() isShow : boolean;
  @Output() logsValue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }



  showLogs() {
    this.isShow = !this.isShow;
    this.logsValue.emit(this.isShow);
  }

}
