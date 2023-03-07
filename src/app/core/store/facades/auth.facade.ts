import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.class';
import * as actions from '../actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    constructor(private store: Store) {}

    public login(loginInfo: User): void {
        this.store.dispatch(actions.login({ user: loginInfo }));
    }
}
