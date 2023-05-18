import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralRoutingModule } from './general-routing.module';
import { UserFormComponent } from './users/user-form/user-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        UsersListComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        GeneralRoutingModule,
        NgSelectModule,
        TranslateModule,
        DropzoneModule,
        ReactiveFormsModule
    ]
})
export class GeneralModule { }
