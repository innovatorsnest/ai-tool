import { map } from 'rxjs/operators';
import { ObservablesService } from './../../../services/observable.service';
import { ToolService } from './../../../services/tool.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  allLogs: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  allTypes =  [
    'good',
    'bad',
    'annotated',
    'non_annotated'
  ]
  getAllIntents: any;

  allMetric = [
    'good',
    'bad',
    'annotated',
    'non_annotated'
  ]

  filter = {
    type: "",
    intent: "",
    entity: "",
    metric: "",
  }


  allEntities: Response;



  constructor(
    private dataService: ToolService,
    private observableService: ObservablesService,
  ) {

    this.observableService.updateSpinnerStatus(false);
  }

  ngOnInit() {

    this.getAllLogs();
  }


  getAllLogs() {

    this.observableService.updateSpinnerStatus(true);
    this.dataService.allConversationLogs().subscribe((response) => {
      if (response["success"] === true) {
        this.allLogs = response["logs"];
        if(this.allLogs.length > 0) {
          this.getAllIntents = this.allLogs.map((log) => {
            return log.intent;
          })

          this.getAllEntities();
        }
        this.observableService.updateSpinnerStatus(false);
      }





      console.log('%c all conversation logs', 'color: yellow', this.allLogs);


    }, (error) => {
      console.log('error  while getting getting logs', error);
    })
  }

  getAllEntities() {
    this.dataService.gettingAllEntity().subscribe((response) => {
      console.log('response from getting the entities', response);
      this.allEntities = response["data"];

    }, (error => {
      console.log('error while getting all the entities', error);

    }))
  }

  filterLogs(type,intent,entity,metric) {
    this.observableService.updateSpinnerStatus(true);
    console.log('type,intent,entity,metric', `${this.filter.type} ${this.filter.intent} ${this.filter.entity} ${this.filter.metric}`);

    this.dataService.filterLogsApi(this.filter.intent,this.filter.entity,this.filter.type,this.filter.metric).subscribe((response) => {

      console.log('response while getting the filtering results', response);
      this.allLogs = response["logs"];
      this.observableService.updateSpinnerStatus(false);


    }, error => {
      console.log('error while getting the filtering results', error);

    })
  }

  clearFilters() {
    // resetting the values of the filter
    this.filter.type = ''
    this.filter.intent = ''
    this.filter.entity = ''
    this.getAllLogs();
  }

  refreshLogs(event) {
   console.log('event', event);
   this.getAllLogs();
  }

}
