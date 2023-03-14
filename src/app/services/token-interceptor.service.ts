import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, catchError } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
    providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
    private authService!: AuthService;
    constructor(private injector: Injector) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.authService = this.injector.get(AuthService);
        const token: string | null = this.authService.getToken();

        console.log('token intercepte');

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return next.handle(request);
    }
}

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((response: any) => {
                if (
                    response instanceof HttpErrorResponse ||
                    response.status === 401
                ) {
                    localStorage.removeItem('token');
                }
                return throwError(() => new Error('error'));
            })
        );
    }
}
