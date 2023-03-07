import { createAction, props } from '@ngrx/store';

import { User } from '../../models/user.class';

export const login = createAction(
    '[Login Page] Login',
    props<{ user: User }>()
);

export const loginSuccess = createAction(
    '[Login Page] Login success',
    props<{ msg: string }>
);

export const loginFailure = createAction(
    '[Login Page] Login failure',
    props<{ msg: string }>
);
