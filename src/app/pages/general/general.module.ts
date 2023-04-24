import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';



@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        GeneralRoutingModule
    ]
})
export class GeneralModule { }
