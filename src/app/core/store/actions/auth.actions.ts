import { createAction, props } from '@ngrx/store';

import { User } from '../../models/user.class';

export const login = createAction('[Auth] Login', props<{ user: User }>());

export const loginSuccess = createAction(
    '[Auth] Login success',
    props<{ payload: any }>()
);

export const loginFailure = createAction('[Auth] Login failure');

export const signup = createAction('[Auth] Signup', props<{ user: User }>());

export const signupSuccess = createAction(
    '[Auth] Signup success',
    props<{ token: any }>()
);

export const signupFailure = createAction('[Auth] Signup failure');

export const logout = createAction('[Auth] Logout');

export const getProfile = createAction('[Auth] Get Profile');
