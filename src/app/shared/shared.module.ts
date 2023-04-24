import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';
import { DatatableComponent } from './tables/datatable/datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';
import { UsersButtonsComponent } from './buttons/users-buttons/users-buttons.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DatatableComponent,
    UsersButtonsComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    DataTablesModule.forRoot(),
    TranslateModule,
    NgbDropdownModule
  ],
  exports: [
    DatatableComponent,
    UsersButtonsComponent
  ]
})

export class SharedModule { }
