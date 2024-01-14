import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';

import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as actions from '../actions/auth.actions';
import { AuthService } from 'src/app/services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    // effects go here

    public login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.login),
            mergeMap(({ user }) =>
                this.authService.login(user.email, user.password).pipe(
                    map((response: any) => {
                        console.log(response);
                        return actions.loginSuccess({
                            payload: response,
                        });
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(actions.loginFailure());
                    })
                )
            )
        );
    });

    public loginSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(actions.loginSuccess),
                tap((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.payload.token);
                    this.router.navigateByUrl('/');
                })
            );
        },
        { dispatch: false }
    );

    public loginFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(actions.loginFailure),
                tap(() => {
                    console.log('failure');
                })
            );
        },
        { dispatch: false }
    );

    public signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.signup),
            mergeMap(({ user }) =>
                this.authService.signUp(user.email, user.password).pipe(
                    map((response) => {
                        console.log(response);
                        return actions.signupSuccess({ token: response.token });
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(actions.signupFailure());
                    })
                )
            )
        );
    });

    public signupSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(actions.signupSuccess),
                tap((response) => {
                    console.log(response);
                    localStorage.setItem('token', response.token);
                    this.router.navigateByUrl('/');
                })
            );
        },
        { dispatch: false }
    );

    public signupFailure$ = createEffect(
        () => {
            return this.actions$.pipe(ofType(actions.signupFailure));
        },
        { dispatch: false }
    );

    public logout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(actions.logout),
                tap(() => {
                    localStorage.removeItem('token');
                })
            );
        },
        { dispatch: false }
    );

    public getProfile$ = createEffect(
        (): Observable<any> => {
            return this.actions$.pipe(
                ofType(actions.getProfile),
                switchMap(() => {
                    return this.authService
                        .getProfile()
                        .pipe(map((response) => response));
                })
            );
        },
        { dispatch: false }
    );
}
