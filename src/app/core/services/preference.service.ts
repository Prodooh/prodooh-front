import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { PayloadPereferences } from '../interfaces/payload-preferences';


@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(
    private baseService: BaseService
  ) { }

  savePreferences(payload: PayloadPereferences) {
    return this.baseService.postQuery('users/preferences', { payload }).subscribe();
  }
}