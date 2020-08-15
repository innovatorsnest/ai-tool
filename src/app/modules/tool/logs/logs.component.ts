import { ObservablesService } from './../../../services/observable.service';
import { ToolService } from './../../../services/tool.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  allLogs: any;



  constructor(
    private dataService: ToolService,
    private observableService: ObservablesService,
  ) { }

  ngOnInit() {

    this.getAllLogs();
  }


  getAllLogs() {



    this.observableService.updateSpinnerStatus(true);
    this.dataService.allConversationLogs().subscribe((response) => {
      if (response["success"] === true) {
        this.allLogs = response["logs"];
        this.observableService.updateSpinnerStatus(false);
      }

      console.log('%c all conversation logs', 'color: yellow', this.allLogs);


    }, (error) => {
      console.log('error  while getting getting logs', error);
    })
  }

}
