import { Injectable } from '@angular/core';
import { Token } from '../interfaces/token';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

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

  getCountries() {
    this.refreshToken();
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    const URL = `${ environment.urlBackend }/countries`;
    return this.http.get( URL, { headers } );
  }
}
