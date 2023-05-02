import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { AuthService } from 'src/app/core/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { SweetAlertService } from '../../../core/services/sweet-alert.service';
import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  passwordForm: FormGroup;
  submitted = false;
  year: number = new Date().getFullYear();
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirmation: ['']
    }, { validator: confirmPasswordValidator() });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get f() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {return; }

    this.loading = true;

    this.subscriptions.add(
      this.authService.updatePassword(this.f.password.value).subscribe({
        next: () => {
          this.loading = false;
          let tokenLocalStorage = JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey));
          tokenLocalStorage.user.is_change_password = true;
          this.cookieService.set(environment.sessionCookieStorageKey, JSON.stringify(tokenLocalStorage),15,'/');
          this.sweetAlertService.success();
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.loading = false;
          this.sweetAlertService.error();
        }
      })
    )
  }
}
