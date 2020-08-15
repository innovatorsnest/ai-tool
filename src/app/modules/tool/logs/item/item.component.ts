import { ObservablesService } from './../../../../services/observable.service';
import { ToolService } from './../../../../services/tool.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import tippy from 'tippy.js';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  isThumsup = '';


  showAnalysModal = false;
  editIntentShow  = false;


  @Input() log;

  @Output() refreshLogsStatus = new EventEmitter();

  constructor(
    private dataService: ToolService,
    private observableService: ObservablesService,
  ) { }

  ngOnInit() {
  }

  makeSuggestion(suggestion, log) {
    console.log('suggestion here', suggestion)
    console.log('log', log)

    const payload = {
      _id: log._id.$oid,
      updates: {
        intent: log.intent,
        entities: log.entities,
        good: suggestion === 'up' ? true : false,
        bad: suggestion === 'down' ? true: false,
        annotated: true,
        non_annotated: false
      }
    }

    this.logsUpdate(payload);
  }


  logsUpdate(payload) {
    this.dataService.logsUpdate(payload).subscribe((response) => {
      console.log('response while submitting the sentence', response);
      if (response["success"] === true) {
        this.observableService.updateSpinnerStatus(false);
        this.observableService.displaySnackbar("Successfully Submitted Sentence");
        this.refreshLogsStatus.emit(true);
      }
    }, error => {
      console.log('error while updating sentence ', error);
    })
  }


  editIntent() {
    // this.showAnalysModal = true;
    console.log('log', this.log);
    this.editIntentShow = true;
  }

  closeAnalyzeModel(event) {
    this.editIntentShow = event;
  }

}
