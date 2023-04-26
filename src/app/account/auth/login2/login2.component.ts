import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Token } from 'src/app/core/interfaces/token';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.scss']
})

export class Login2Component implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  fieldTextType: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private translate: TranslateService,
    private cookieService: CookieService,
    private localStorageService: LocalStorageService
  ) { }

  loginForm: UntypedFormGroup;
  submitted = false;
  error = '';

  year: number = new Date().getFullYear();

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    this.subscriptions.add(
      this.authService.login({
        username: this.f.email.value,
        password: this.f.password.value
      }).subscribe({
        next: (resp: Token) => {
          this.cookieService.set(`${ environment.sessionCookieStorageKey }`, JSON.stringify( resp ), 15, '/');
          this.localStorageService.set('payload', resp.user.payload);
          this.router.navigate(['/'])
        },
        error: (error) => {
          this.error = error.error == 'failed_authentication' ? this.translate.instant('ERRORS.AUTH.failed_authentication') : 'Error'
        }
      })
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
