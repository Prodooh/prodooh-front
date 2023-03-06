import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  token: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    if (!this.cookieService.get(environment.sessionCookieStorageKey)) {
      this.token = {};
      return;
    }
    this.token = JSON.parse(( this.cookieService.get( environment.sessionCookieStorageKey ) ))
  }

  getQuery( query: string ) {
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    const URL = `${ environment.url_backend }/${ query }`;
    return this.http.get( URL, { headers } );
  }

  getQueryFile( query: string ) {
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`,
      responseType: 'arraybuffer'
    });
    const URL = `${ environment.url_backend }/${ query }`;
    return this.http.get( URL, { headers } );
  }

  postQuery( query: string, data: any ) {
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    return this.http.post( `${ environment.url_backend }/${ query }`, data, { headers } );
  }

  putQuery( query: string, data: any ) {
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    return this.http.put( `${ environment.url_backend }/${ query }`, data, { headers } );
  }

  deleteQuery( query: string ) {
    const headers = new HttpHeaders({
      Authorization: `${ this.token.token_type } ${ this.token.access_token }`
    });
    return this.http.delete( `${ environment.url_backend }/${ query }`, { headers } );
  }

}
