import { PopperDirective } from './../../helper/popper.directive';
import { ToolService } from '../../services/tool.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ItemComponent } from './logs/item/item.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { FormsModule } from '@angular/forms';
import { NgxPopper } from 'angular-popper';
import {NgxPopperModule} from 'ngx-popper';
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [StatsComponent, LogsComponent, ItemComponent, AnalyzeComponent, PopperDirective],
  imports: [
    CommonModule,
    MaterialModule,
    NgxPopper,
    NgxPopperModule.forRoot({placement: 'bottom'}),
    NgxPaginationModule,
    FormsModule
  ],
  exports: [StatsComponent,LogsComponent, ItemComponent,AnalyzeComponent],
  providers: [ToolService]
})
export class ToolModule { }
