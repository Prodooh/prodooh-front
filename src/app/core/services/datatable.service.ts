import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {
  constructor(
    private http: HttpClient
  ) { }

  getData(dtOptions: any, type: string) {
    return this.http.post(`${environment.urlBackend}/datatables/${type}`, dtOptions);
  }
}
