import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './core/models/user.class';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private BASE_URL = 'http://localhost:1337';

    constructor(private http: HttpClient) {}

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    public logIn(
        email: string | undefined,
        password: string | undefined
    ): Observable<User> {
        const url = `${this.BASE_URL}/login`;
        return this.http.post<User>(url, { email, password });
    }

    public signUp(email: string, password: string): Observable<User> {
        const url = `${this.BASE_URL}/register`;
        return this.http.post<User>(url, { email, password });
    }
}
