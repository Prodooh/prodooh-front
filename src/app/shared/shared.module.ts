import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { DatatableComponent } from './tables/datatable/datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    DataTablesModule.forRoot(),
    TranslateModule
  ],
  exports: [
    DatatableComponent
  ]
})

export class SharedModule { }
