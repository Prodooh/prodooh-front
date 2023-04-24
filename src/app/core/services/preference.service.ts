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

  savePreferences(obj: object) {
    return this.baseService.postQuery('users/preferences', obj).subscribe();
  }
}