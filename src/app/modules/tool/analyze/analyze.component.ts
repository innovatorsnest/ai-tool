import { ToolService } from './../../../services/tool.service';
import { ObservablesService } from './../../../services/observable.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  @Input() intentData;
  @Input() sentenceText;
  @Input() id;
  @Input() type;
  @Input() intent;
  @Input() entities;
  @Output() closeModel = new EventEmitter();




  intentFetched: string;
  getEntities: any;
  constructor(
    private observableService: ObservablesService,
    private dataService: ToolService
  ) {

  }

  ngOnInit() {

    this.getAllEntities();

    const intentDataFormated = this.intentData.filter((data) => {
      if (data.intent === this.intent) {
        return data.intent;
      }
    })

    this.sentenceText = this.sentenceText.split(' ');

    console.log('sentence text', this.sentenceText);


    console.log('intent data formattted', intentDataFormated)
    if (intentDataFormated[0]) {
      this.intentFetched = `${intentDataFormated[0].confidence_score.toPrecision(4)}%:${intentDataFormated[0].intent}`
    }
    console.log('intent fetched ', this.intentFetched);
    console.log('type ', this.type);



  }


  getAllEntities() {

    this.observableService.updateSpinnerStatus(true);
    this.dataService.gettingAllEntity().subscribe((response) => {
      console.log('getting the response of the entity', response);

      this.getEntities = response["data"]["userEntities"];
      this.observableService.updateSpinnerStatus(false);

    }, (error) => {
      if (error) {
        console.log('error inside the getting Entity', error);
      }
    });
  }


  mapEntity(event) {
    console.log('event', event);
  }


  subSentence(intent) {
    console.log('intent', intent);
    console.log('intent split', intent.split(':')[1]);
    const payload =
    {
      _id: this.id,
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
        this.closeTheAnlyse('callApi');
      }
    }, error => {
      console.log('error while updating sentence ', error);
    });
  }


  closeTheAnlyse(value) {
    this.closeModel.emit(value);
  }

  onShown(event, ref) {
    console.log('event', event);

    ref.show();


  }




}
