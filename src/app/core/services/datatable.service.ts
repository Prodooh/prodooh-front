import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  constructor(
    private baseService: BaseService
  ) { }

  getData(dtOptions: any, type: string) {
    return this.baseService.postQuery(`datatables/${type}`, dtOptions);
  }
}
