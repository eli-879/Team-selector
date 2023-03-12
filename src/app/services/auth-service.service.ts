import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../core/models/user.class';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private BASE_URL = 'http://localhost:1337';

    constructor(private http: HttpClient) {}

    public getToken(): string | null {
        return localStorage.getItem('token');
    }

    public login(
        email: string | undefined,
        password: string | undefined
    ): Observable<User> {
        const url = `${this.BASE_URL}/login`;
        console.log(email, password);
        return this.http.post<User>(url, { email, password });
    }

    public signUp(
        email: string | undefined,
        password: string | undefined
    ): Observable<User> {
        const url = `${this.BASE_URL}/register`;
        return this.http.post<User>(url, { email, password });
    }

    public getProfile(): Observable<User> {
        const url = `${this.BASE_URL}/status`;
        const p = this.http.get<User>(url);
        console.log(p);
        return p;
    }
}
