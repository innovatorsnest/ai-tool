import { ObservablesService } from './../../services/observable.service';
import { ToolService } from '../../services/tool.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  sentence: string = '';

  showAnalysModal: boolean = false;
  showLogs = false;
  sentenceData: Response;
  getEntities: any;
  sentenceText: string;
  stats: Response;

  constructor(
    private dataService: ToolService,
    private observableService: ObservablesService,
  ) { }


  ngOnInit() {
    // this.getAllEntities();
    this.gettingStats();
  }


  logs(value) {
    console.log('value for toggle', value);
    this.showLogs = value;
  }

  gettingStats() {
    this.observableService.updateSpinnerStatus(true);
    this.dataService.gettingStatsCount().subscribe((response) => {
      this.stats = response;
      this.observableService.updateSpinnerStatus(false);

    }, error => {
      console.log('error while getting the stats count', error);

    })
  }

  analyzeSentence() {
    console.log("getting the sentence type", this.sentence);
    console.log('show analyze model', this.showAnalysModal);

    if (this.sentence !== undefined && this.sentence !== '') {
      this.observableService.updateSpinnerStatus(true);

      const payload = {
        query: this.sentence,
        lang: "en"
      };

      this.dataService.gettingDataFromNlu(payload).subscribe(
        response => {
          console.log("response from getting the data from the nlu", response);
          this.showAnalysModal = true;
          this.sentenceText = this.sentence;
          this.sentenceData = response;
          this.showLogs = false;
          this.observableService.updateSpinnerStatus(false);
        },
        error => {
          console.log("error while training the response", error);
        }
      );
    } else {
      this.observableService.displaySnackbar('Sentence Cannot be empty');
    }

  }
  closeAnalyzeModel(event) {
    this.showAnalysModal = false;
    this.showLogs = true;
  }

  cancelLogic() {
    this.showAnalysModal = false;
  }




}
