import { map } from 'rxjs/operators';
import { ObservablesService } from './../../../services/observable.service';
import { ToolService } from './../../../services/tool.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  allLogs: any;

  page :any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  allTypes = [
    'good',
    'bad',
    'annotated',
    'non_annotated'
  ]
  getIntents: any;

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
  allEntities: any;





  constructor(
    private dataService: ToolService,
    private observableService: ObservablesService,
  ) {

    this.observableService.updateSpinnerStatus(false);
  }

  ngOnInit() {

    this.getAllIntents();
    this.getAllEntities();
    this.getAllLogs();
  }



  getAllEntities() {

    this.observableService.updateSpinnerStatus(true);
    this.dataService.gettingAllEntity().subscribe((response) => {
      console.log('getting the response of the entity', response);

      const entityObject = [];

      this.allEntities = response["data"]["userEntities"];
      this.observableService.updateSpinnerStatus(false);

    }, (error) => {
      if (error) {
        console.log('error inside the getting Entity', error);
      }
    });
  }


  getAllIntents() {
    this.observableService.updateSpinnerStatus(true);

    this.dataService.gettingAllIntent().subscribe((response) => {
      console.log('%c gettig the response from all intents', 'color: yellow', response);
      this.getIntents = response["data"];
      this.observableService.updateSpinnerStatus(false);

    }, error => {
      console.log('error while getting the intents', error);
    });
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



  filterLogs(type, intent, entity, metric) {
    this.observableService.updateSpinnerStatus(true);
    console.log('type,intent,entity,metric', `${this.filter.type} ${this.filter.intent} ${this.filter.entity} ${this.filter.metric}`);

    this.dataService.filterLogsApi(this.filter.intent, this.filter.entity, this.filter.type, this.filter.metric).subscribe((response) => {

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
