import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangedGuard implements CanActivate {
  
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {       
    let passwordHasChange = this.validateIfHasChangedPassword();

    if (!passwordHasChange) {
      this.router.navigate(['/account/update-password']);  
      return false;
    }

    return true;
  }

  validateIfHasChangedPassword() {
    if (!this.cookieService.check(environment.sessionCookieStorageKey)) {
      return false;
    }
    return JSON.parse(this.cookieService.get(environment.sessionCookieStorageKey)).user.is_change_password;
  }
}
