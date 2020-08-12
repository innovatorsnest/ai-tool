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
  showLogs: boolean;
  sentenceData: Response;
  getEntities: any;

  constructor(
    private dataService: ToolService
  ) { }

  ngOnInit() {
    this.getAllEntities();
  }

  getAllEntities() {
    this.dataService.gettingAllEntity().subscribe((response) => {
      this.getEntities = response["data"];
    }, (error) => {
        if(error) {
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

    if (this.sentence !== undefined) {
      const payload = {
        query: this.sentence,
        lang: "en"
      };

      this.dataService.gettingDataFromNlu(payload).subscribe(
        response => {
          console.log("response from getting the data from the nlu", response);

          this.sentenceData = response;

          this.showAnalysModal = true;
        },
        error => {
          console.log("error while training the response", error);
        }
      );
    }
  }
}
