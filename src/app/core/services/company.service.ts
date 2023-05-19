import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from '../interfaces/token';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  token: Token;

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  refreshToken() {
    if (!this.cookieService.get(environment.sessionCookieStorageKey)) {
      this.token = undefined;
      return;
    }
    this.token = JSON.parse(this.cookieService.get( environment.sessionCookieStorageKey));
  }

  getCompanies() {
    this.refreshToken();
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    const URL = `${ environment.urlBackend }/companies`;
    return this.http.get( URL, { headers } );
  }
}
