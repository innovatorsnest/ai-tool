import { ObservablesService } from './services/observable.service';
import { ToolModule } from './modules/tool/tool.module';
import {MaterialModule} from './shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToolComponent } from './modules/tool/tool.component';
import { NgxPopper } from 'angular-popper';


@NgModule({
  declarations: [
    AppComponent,
    ToolComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxPopper,
    FormsModule,
    HttpClientModule,
    ToolModule
  ],
  providers: [ObservablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
