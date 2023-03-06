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

  savePreferences(type: string, value: string|boolean) {
    return this.http.post<any>(environment.urlBackend + 'users/preference/1', { type: value }).subscribe();
  }
}