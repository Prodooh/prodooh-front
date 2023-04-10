import { NgModule } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        AdministratorRoutingModule,
        SharedModule
    ],
    exports: []
})

export class AdministratorModule {}