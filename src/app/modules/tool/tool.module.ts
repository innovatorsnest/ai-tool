import { ToolService } from '../../services/tool.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [StatsComponent, LogsComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StatsComponent,LogsComponent],
  providers: [ToolService]
})
export class ToolModule { }
