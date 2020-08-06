import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';


@NgModule({
  declarations: [StatsComponent, LogsComponent],
  imports: [
    CommonModule
  ],
  exports: [StatsComponent,LogsComponent]
})
export class ToolModule { }
