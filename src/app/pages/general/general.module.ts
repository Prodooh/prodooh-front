import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users/users-list/users-list.component';
import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [
        UsersListComponent
    ],
    imports: [
        CommonModule,
        GeneralRoutingModule,
        SharedModule
    ]
})
export class GeneralModule { }
