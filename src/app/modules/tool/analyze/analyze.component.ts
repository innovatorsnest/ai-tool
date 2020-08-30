import { ToolService } from './../../../services/tool.service';
import { ObservablesService } from './../../../services/observable.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { WrappedNodeExpr } from '@angular/compiler';

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
  @Input() entityData;
  @Output() closeModel = new EventEmitter();


  default = '--';




  mappedEntity: any;
  intentFetched: string;
  getEntities: any;
  entityList: any;
  sentenceList: any;
  constructor(
    private observableService: ObservablesService,
    private dataService: ToolService
  ) {

  }

  ngOnInit() {

    console.log('%c getting the entity data ', 'color: yellow', this.entityData);

    this.mapSentence();
    this.getAllEntities();


    const intentDataFormated = this.intentData.filter((data) => {
      if (data.intent === this.intent) {
        return data.intent;
      }
    });






    console.log('intent data formattted', intentDataFormated)
    if (intentDataFormated[0]) {
      this.intentFetched = `${intentDataFormated[0].confidence_score.toPrecision(4)}%:${intentDataFormated[0].intent}`
    }
    console.log('intent fetched ', this.intentFetched);
    console.log('type ', this.type);
  }


  mapSentence() {

    // making the array list
    this.sentenceList = this.sentenceText.split(' ');

    console.log('sentence list', this.sentenceList);

    if (this.type === 'submit') {
      this.sentenceMapping(this.entityData.userEntities);
    }

    if (this.type === 'edit') {
      this.sentenceMapping(this.entities);
    }

  }


  editSentenceMapping(entities) {
    console.log('entities', entities);
    // making the object
    const mappedList = [];
    const sentenceListClone = this.sentenceList.slice().map((word) => {
      return {
        name: word,
        value: '',
        color: 'transparent',
        end: 0,
        start: 0
      };
    });


    console.log('mapped sentence list', mappedList);
    console.log('sentence list', this.sentenceList);
    console.log('sentence clone', sentenceListClone);


    console.log('%c edit mapped list', 'color: yellow', sentenceListClone)

    this.sentenceList = sentenceListClone;
  }
  sentenceMapping(entities) {

    console.log('entities', entities);
    // making the object

    const sentenceListClone = this.sentenceList.slice().map((word) => {
      return {
        name: '',
        value: word,
        color: 'transparent',
        end: 0,
        start: 0
      };
    });

    if (entities.length > 0) {
      console.log('%c entity exist lets color it','color: yellow', entities);
      entities.forEach((entity) => {
        sentenceListClone.forEach((word) => {
          console.log('entity name', entity.name);
          console.log('word', word);
          if (entity.value.toLowerCase() === word.value.toLowerCase()) {
            word.name = entity.name,
              word.value = entity.value.toLowerCase(),
              word.color = entity.color,
              word.end = entity.end,
              word.start = entity.start
          }
        });
      });

      console.log('sentence clone', sentenceListClone);
      console.log('sentence List', this.sentenceList);
      this.sentenceList = sentenceListClone;
    } else {
      console.log('no entities are mapped', this.sentenceList);
      this.mappingWithoutEntity();

    }
   }

  mappingWithoutEntity() {
    this.sentenceList = this.sentenceList.slice().map((word) => {
      return {
        name: '',
        value: word,
        color: 'transparent',
        end: 0,
        start: 0
      };
    });
  }
  getAllEntities() {

    this.observableService.updateSpinnerStatus(true);
    this.dataService.gettingAllEntity().subscribe((response) => {
      console.log('getting the response of the entity', response);

      const entityObject = [];

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

    const entities = this.sentenceList.filter((entity) => {
      if (entity.color !== 'transparent') {
        return entity;
      }
    });

    console.log('intent split', intent.split(':')[1]);
    const payload = {
      _id: this.id,
      updates: {
        intent: intent.split(':')[1],
        entities: entities
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

  onShown(event, ref, word) {
    console.log('event', event);
    ref.show();
    // this.mapEntity = word.name;
    console.log('word fetched', word);


  }

  removeEntity(word) {
    word.name = '--';
    word.color = 'transparent';
  }

  setEntity(word) {
    console.log('sentence List', this.sentenceList);
    console.log('set entity word', word);
    this.getEntities.forEach((item) => {

      console.log('getentities item', item);
      console.log('word ', word);

      if (word.name === item.name) {
        console.log('matched value word', word);
        console.log('matched value item', item);
        word.color = item.color;
        console.log('item name', item.name);
        console.log('word name', word.name);
        console.log('word value', word.value);
        console.log('word value', word.value);
        console.log('sentence text', this.sentenceText);
        word.start = this.sentenceText.indexOf(word.value);
        word.end = word.start + word.value.length;
      }

    });
  }
}


