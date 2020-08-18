import { ToolService } from './../../../services/tool.service';
import { ObservablesService } from './../../../services/observable.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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
  @Output() closeModel = new EventEmitter();
  intentFetched: string;
  constructor(
    private observableService: ObservablesService,
    private dataService: ToolService
  ) { }

  ngOnInit() {


    const intentDataFormated = this.intentData.filter((data) => {
      if (data.intent === this.intent) {
        return data.intent;
      }
    })

    console.log('intent data formattted', intentDataFormated)
    this.intentFetched = `${intentDataFormated[0].confidence_score.toPrecision(4)}%:${intentDataFormated[0].intent}`
    console.log('intent fetched ', this.intentFetched);
    console.log('type ', this.type);

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
    })
  }


  closeTheAnlyse(value) {
    this.closeModel.emit(value);
  }




}
