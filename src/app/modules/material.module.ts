import { MatButtonModule, MatCheckboxModule } from "@angular/material";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NgModule } from "@angular/core";
import { CdkTableModule } from "@angular/cdk/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import {MatDividerModule} from '@angular/material/divider';
import { MatGridListModule } from "@angular/material/grid-list";
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    CdkTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatChipsModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule
  ]
})
export class MaterialModule {
  constructor() {}
}
