import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    public canActivate(): boolean {
        if (!this.auth.getToken()) {
            this.router.navigateByUrl('/login');
            return false;
        }

        return true;
    }
}
