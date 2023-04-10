import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private http: HttpClient
  ) { }

  savePreferences(type: string, value: string | boolean) {
    let obj = {};
    obj[type] = value; 
    return this.http.post<any>(`${environment.urlBackend}/users/preferences`, obj).subscribe();
  }
}