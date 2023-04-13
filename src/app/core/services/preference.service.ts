import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private baseService: BaseService
  ) { }

  savePreferences(type: string, value: string | boolean) {
    let obj = {};
    obj[type] = value; 
    return this.baseService.postQuery('users/preferences', obj).subscribe();
  }
}