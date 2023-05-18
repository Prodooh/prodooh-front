import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/auth.models';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    constructor(
        private http: HttpClient,
        private baseService: BaseService
    ) { }

    getAll() {
        return this.http.get<User[]>(`/api/login`);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    addUser( user: User ) {
        return this.baseService.postQuery( 'users', user );
    }

}
