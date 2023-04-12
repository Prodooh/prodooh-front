import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(
    private translate: TranslateService
  ) { }

  alert(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok',
      timer: 3500
    });
  }

  notification( icon: SweetAlertIcon, title: string ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon,
      title
    });
  }

  error() {
    Swal.fire({
      title: this.translate.instant('ERRORS.GENERAL.TEXT_1'),
      text: this.translate.instant('ERRORS.GENERAL.TEXT_2'),
      icon: 'error',
      confirmButtonText: 'Ok',
      timer: 3500
    });
  }

  success() {
    Swal.fire({
      title: this.translate.instant('GENERAL.MESSAGES.TEXT_SUCCESS_1'),
      text: this.translate.instant('GENERAL.MESSAGES.TEXT_SUCCESS_2'),
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 3500
    });
  }
}
