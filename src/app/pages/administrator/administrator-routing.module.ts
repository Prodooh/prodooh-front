import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';

const routes: Routes = [
    {
        path: 'users-list',
        component: UserListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministratorRoutingModule {}
