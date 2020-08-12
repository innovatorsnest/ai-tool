import { ToolService } from '../../services/tool.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { LogsComponent } from './logs/logs.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ItemComponent } from './logs/item/item.component';



@NgModule({
  declarations: [StatsComponent, LogsComponent, ItemComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StatsComponent,LogsComponent, ItemComponent],
  providers: [ToolService]
})
export class ToolModule { }
