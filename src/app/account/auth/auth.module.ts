import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
import { SignupComponent } from './signup/signup.component';
import { Register2Component } from './register2/register2.component';
import { Recoverpwd2Component } from './recoverpwd2/recoverpwd2.component';

import { AuthRoutingModule } from './auth-routing';
import { PasswordResetComponent } from './passwordreset/passwordreset.component';
import { TranslateModule } from '@ngx-translate/core';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    Login2Component,
    SignupComponent,
    PasswordResetComponent,
    Register2Component,
    Recoverpwd2Component,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    TranslateModule
  ]
})
export class AuthModule { }
