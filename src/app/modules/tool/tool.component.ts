import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  sentence: string = '';

  constructor() { }

  ngOnInit() {
  }


  analyzeSentence() {
    console.log('analyse content');
  }
}
