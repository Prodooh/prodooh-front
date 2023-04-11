import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private baseService: BaseService
  ) {}

  login( userAuth: Auth ) {
    userAuth = Object.assign( environment.serverConfig, userAuth );
    return this.http.post( `${ environment.urlBackend }/auth/token`, userAuth );
  }
  
  logout() {
    return this.baseService.getQuery('auth/logout');
  }

  updatePassword(password: string) {
    return this.baseService.postQuery( 'auth/update-password', { password } );
  }
}
