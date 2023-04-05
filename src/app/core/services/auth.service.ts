import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { Auth } from '../interfaces/auth';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private cookieService: CookieService,
  ) {}

  login( userAuth: Auth ) {
    userAuth = Object.assign( environment.serverConfig, userAuth );
    return this.http.post( `${ environment.urlBackend }/auth/token`, userAuth )
      .pipe(
        map ( resp => {
          this.cookieService.set(`${ environment.sessionCookieStorageKey }`, ( JSON.stringify( resp )), 5);
          return resp;
        })
      );
  }
  
  logout() {
    this.cookieService.delete( environment.sessionCookieStorageKey );
    return this.baseService.getQuery( 'users/logout' );
  }

}
