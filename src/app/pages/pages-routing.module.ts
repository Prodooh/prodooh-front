import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
import { UsersListComponent } from './general/users/users-list/users-list.component';

const routes: Routes = [
  {
    path: "",
    component: DefaultComponent
  },
  {path: 'users', loadChildren: () => import('./general/general.module').then(m => m.GeneralModule)},
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'administrator', loadChildren: () => import('./administrator/administrator.module').then(m => m.AdministratorModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
