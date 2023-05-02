import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Login2Component } from './login2/login2.component';

import { PasswordResetComponent } from './passwordreset/passwordreset.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';
import { UnAuthGuard } from 'src/app/core/guards/un-auth.guard';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'login',
        component: Login2Component,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'update-password',
        component: UpdatePasswordComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'recover-password',
        component: Recoverpwd2Component,
        canActivate: [UnAuthGuard]
    },
    {
        path: 'reset-password/:token/:emailb64',
        component: PasswordResetComponent,
        canActivate: [UnAuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
