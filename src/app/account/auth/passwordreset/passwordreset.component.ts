import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { confirmPasswordValidator } from 'src/app/core/validators/confirm-password.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ResetPassword } from 'src/app/core/interfaces/reset-password';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordResetComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  signupForm: UntypedFormGroup;
  submitted = false;
  loading = false;

  email: string;
  token: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sweetAlertService: SweetAlertService,
    private translate: TranslateService
  ) { }

  ngOnInit() {    
    this.route.params.subscribe(({token, emailb64}) => {
      this.email = atob(emailb64);
      this.token = token;
    })

    this.signupForm = this.formBuilder.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['']
    }, { validator: confirmPasswordValidator() });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) { return; }

    this.loading = true;

    let reset: ResetPassword = {
      token: this.token,
      email: this.f.email.value,
      password: this.f.password.value
    }

    this.subscriptions.add(
      this.authService.resetPassword(reset).subscribe({
        next: () => {
          this.loading = false;
          this.sweetAlertService.success();
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.loading = false;
          this.sweetAlertService.alert(
            this.translate.instant('ERRORS.AUTH.TOKEN_EXPIRED'),
            this.translate.instant('ERRORS.AUTH.TEXT_TOKEN_EXPIRED'),
            'error'
          );
          this.router.navigateByUrl('/account/recover-password');
        }
      })
    )
  }
}
