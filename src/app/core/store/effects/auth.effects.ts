import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

import { catchError, map, mergeMap } from 'rxjs/operators';
import * as actions from '../actions/auth.actions';

import { AuthService } from 'src/app/auth-service.service';
import { User } from '../../models/user.class';
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
                this.authService.logIn(user.email, user.password).pipe(
                    map((user: User) => {
                        console.log(user);
                        return actions.loginSuccess();
                    }),
                    catchError((error) => {
                        console.log(error);
                        return of(actions.loginFailure());
                    })
                )
            )
        );
    });
}
