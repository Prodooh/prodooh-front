import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  token: Token;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  refreshToken() {
    if (!this.cookieService.get(environment.sessionCookieStorageKey)) {
      this.token = undefined;
      return;
    }
    this.token = JSON.parse(this.cookieService.get( environment.sessionCookieStorageKey));
  }

  getQuery( query: string ) {
    this.refreshToken()
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    const URL = `${ environment.urlBackend }/${ query }`;
    return this.http.get( URL, { headers } );
  }

  getQueryFile( query: string ) {
    this.refreshToken()
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`,
      responseType: 'arraybuffer'
    });
    const URL = `${ environment.urlBackend }/${ query }`;
    return this.http.get( URL, { headers } );
  }

  postQuery( query: string, data: any ) {
    this.refreshToken()
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    return this.http.post( `${ environment.urlBackend }/${ query }`, data, { headers } );
  }

  putQuery( query: string, data: any ) {
    this.refreshToken()
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    return this.http.put( `${ environment.urlBackend }/${ query }`, data, { headers } );
  }

  deleteQuery( query: string ) {
    this.refreshToken()
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    return this.http.delete( `${ environment.urlBackend }/${ query }`, { headers } );
  }

}
