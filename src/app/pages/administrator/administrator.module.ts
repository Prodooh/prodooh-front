import { NgModule } from '@angular/core';
import { UserListComponent } from './users/user-list/user-list.component';
import { AdministratorRoutingModule } from './administrator-routing.module';

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        AdministratorRoutingModule
    ],
    exports: []
})

export class AdministratorModule {}