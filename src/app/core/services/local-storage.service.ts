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

  setValue(item: string, key: string, value: string) {
    let localItem = this.get(item);
    let obj = {};
    obj[key] = value;
    localItem = Object.assign(localItem, obj);
    console.log(localItem);
    localStorage.setItem(item, JSON.stringify(localItem));
    console.log("local", localStorage.getItem(item));
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  deleteAll() {
    localStorage.clear();
  }
}
