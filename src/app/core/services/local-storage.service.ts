import { Injectable } from '@angular/core';
import { type } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  deleteAll() {
    localStorage.clear();
  }
}
