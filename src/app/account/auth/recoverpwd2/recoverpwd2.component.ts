import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpwd2',
  templateUrl: './recoverpwd2.component.html',
  styleUrls: ['./recoverpwd2.component.scss']
})
export class Recoverpwd2Component implements OnInit {

  private subscriptions = new Subscription();

   // set the currenr year
   year: number = new Date().getFullYear();

   resetForm: UntypedFormGroup;
   submitted = false;
   
   loading = false;

   constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private sweetAlertService: SweetAlertService,
    private translateService: TranslateService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) { return }

    this.loading = true;

    this.subscriptions.add(
      this.authService.sentLinkResetPassword(this.f.email.value).subscribe({
        next: (resp: string) => {
          this.loading = false;
          this.sweetAlertService.alert(
            'OK',
            this.translateService.instant('AUTH.TEXT_SEND_LINK'),
            'success'
          );
          this.router.navigate(['/account/login']);
        },
        error: (error) => {
          this.loading = false;
          this.sweetAlertService.alert(
            'Error',
            this.translateService.instant('ERRORS.AUTH.MANY_ATTEMPTS'),
            'success'
          );
        }
      })
    );
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
}
