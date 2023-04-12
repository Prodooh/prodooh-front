import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(
    private cookie: CookieService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.cookie.check(environment.sessionCookieStorageKey)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
  
}
