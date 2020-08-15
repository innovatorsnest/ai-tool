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

  constructor(
    private dataService: ToolService,
    private observableService: ObservablesService,
  ) { }

  ngOnInit() {

  }

  getAllEntities() {

    this.observableService.updateSpinnerStatus(true);
    this.dataService.gettingAllEntity().subscribe((response) => {
      this.getEntities = response["data"];
      this.observableService.updateSpinnerStatus(false);

    }, (error) => {
      if (error) {
        console.log('error inside the getting Entity', error);
      }
    })
  }

  logs(value) {
    console.log('value for toggle', value);
    this.showLogs = value;
  }


  analyzeSentence() {
    console.log("getting the sentence", this.sentence);

    this.observableService.updateSpinnerStatus(true);

    if (this.sentence !== undefined) {
      const payload = {
        query: this.sentence,
        lang: "en"
      };

      this.dataService.gettingDataFromNlu(payload).subscribe(
        response => {
          console.log("response from getting the data from the nlu", response);
          this.sentenceData = response;
          this.sentenceText = this.sentence;
          this.observableService.updateSpinnerStatus(false);
          this.showAnalysModal = true;
        },
        error => {
          console.log("error while training the response", error);
        }
      );
    }
  }

  mapEntity(event) {
    console.log('event', event);
  }


  subSentence(intent) {
    console.log('intent', intent);
    console.log('intent split', intent.split(':')[1]);
    const payload =
    {
      _id: this.sentenceData["id"],
      updates: {
        intent: intent.split(':')[1],
        entities:
          [
            // {
            //   name: "light",
            //   color: "#807308",
            //   start: 0,
            //   value: "Master",
            //   end: 6
            // }
          ]
      },
      good: false,
      bad: false,
      annotated: false,
      non_annotated: true
    }

    console.log('payload', payload)

    this.submitSentenceApi(payload);
  }


  submitSentenceApi(payload) {
    this.observableService.updateSpinnerStatus(true);
    this.dataService.logsUpdate(payload).subscribe((response) => {
      console.log('response while submitting the sentence', response);
      if (response["success"] === true) {
        this.observableService.updateSpinnerStatus(false);
        this.observableService.displaySnackbar("Successfully Submitted Sentence");

        this.showAnalysModal = false;
      }
    }, error => {
      console.log('error while updating sentence ', error);
    })
  }

}
