import { Component, OnInit } from "@angular/core";
import { ServiceFunctionService } from "./service-function.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  showSpinner = false;
  trainingSuccess = false;

  // input fields
  sentence: string;

  analyzeObject = [
    { value: "hey", color: "red" },
    { value: "you", color: "blue" }
  ];

  content = "hey hello how are you";

  entities = [
    { name: "Primary", color: "primary" },
    { name: "Accent", color: "accent" },
    { name: "Warn", color: "warn" }
  ];

  stats: any;

  data: any;
  analyzeText: any;
  trainingLogs: any;

  constructor(private serviceFunctionService: ServiceFunctionService) {}

  ngOnInit() {
    this.gettingTrainingLogs();
    this.gettingCount();
  }

  remove(item): void {
    const index = this.entities.indexOf(item);

    if (index >= 0) {
      this.entities.splice(index, 1);
    }
  }

  gettingTrainingLogs() {
    this.showSpinner = true;
    this.serviceFunctionService.gettingTheLogs().subscribe(
      response => {
        console.log("response getting from the training logs", response);
        if (response["success"] === true) {
          this.showSpinner = false;
          this.trainingLogs = response["logs"];
        }
      },
      error => {
        console.log("error while getting the logs from the response", error);
      }
    );
  }

  updateOperation(status, log) {
    if (status === "up") {
      console.log("log", log);
      const payload = {
        _id: log._id.$oid,
        updates: {
          correct: true,
          wrong: false
        }
      };
      this.updateStatus(payload);
    }

    if (status === "down") {
      console.log("log", log);
      const payload = {
        _id: log._id.$oid,
        updates: {
          correct: false,
          wrong: true
        }
      };
      this.updateStatus(payload);
    }
  }

  updateStatus(payload) {
    console.log("payload sending to the training update api", payload);

    this.serviceFunctionService.updatingTheTrainingStatus(payload).subscribe(
      response => {
        console.log(
          "response while getting the data from the training status",
          response
        );
        if (response["success"] === true) {
          this.gettingTrainingLogs();
          this.gettingCount();
        }
      },
      error => {
        console.log(
          "error while getting the data from the training status",
          error
        );
      }
    );
  }


  closePanel() {
    this.trainingSuccess = false;
    this.sentence = '';
  }
  submitSentence() {
    console.log("getting the sentence", this.sentence);
    this.showSpinner = true;

    if (this.sentence !== undefined) {
      const payload = {
        query: this.sentence
      };

      this.serviceFunctionService.gettingDataFromNlu(payload).subscribe(
        response => {
          console.log("response from getting the data from the nlu", response);

          this.data = response;

          if (this.data) {
            // toggling the fields
            this.trainingSuccess = true;
            this.showSpinner = false;

            this.gettingTrainingLogs();
            this.gettingCount();

            // analyse
            this.analyzeText = this.sentence;
          }
        },
        error => {
          console.log("error while training the response", error);
        }
      );
    }
  }

  gettingCount() {
    this.showSpinner = true;
    this.serviceFunctionService.gettingCountLogs().subscribe(
      response => {
        console.log("response from getting the data of the count", response);
        if (response["success"] === true) {
          this.stats = response;
          this.showSpinner = false;
        }
      },
      error => {
        console.log("error from getting the data of the count", error);
      }
    );
  }

  highlight() {
    console.log("content", this.content);

    let content = this.sentence.split(" ");

    let wordIndexArray = [];

    // console.log("content", content);
    this.data["entityData"]["userEntities"].forEach(item => {
      console.log(`item ${item.value} ${item.color}`);

      content.forEach((word, index) => {
        if (word === item.value.toLowerCase()) {
          wordIndexArray.push({
            index: index,
            value: `<span style="background-color: ${item.color}; padding-right: 5px;
            background-color: #807308;
            color: #fff;
            padding-left: 5px;
            border-radius: 3px;" >${word}</span>`
          });
        }
      });
    });

    content.forEach((word, index) => {
      console.log("content inside it ", content);
      wordIndexArray.forEach(item => {
        console.log("word index array", item);
        console.log("content index", index);
        if (index === item.index) {
          content[index] = item.value;
        }
      });
    });

    console.log("content", content);

    // console.log('new content', newContent);
    console.log("index array", wordIndexArray);
    const contentArea = document.getElementById("highlight-content");
    contentArea.innerHTML = content.join(" ");
  }
}
