import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    errorMessage: string | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};

const reducer = createReducer(
    initialState,
    on(actions.login, (state): AuthState => {
        console.log('reducedr');
        return { ...state };
    }),
    on(actions.loginSuccess, (state): AuthState => {
        console.log('success');
        return { ...state, isAuthenticated: true };
    }),

    on(actions.loginFailure, (state): AuthState => {
        console.log('failure');
        return { ...state, errorMessage: 'Incorrect email and/or password.' };
    }),
    on(actions.signupSuccess, (state, response): AuthState => {
        console.log('success', response);
        return {
            ...state,
            isAuthenticated: true,
            user: { token: response.token, email: 'e' },
        };
    }),
    on(actions.signupFailure, (state): AuthState => {
        console.log('failure');
        return { ...state, errorMessage: 'Incorrect email and/or password.' };
    }),
    on(actions.logout, (): AuthState => {
        return { ...initialState };
    })
);

export function authReducer(
    state: AuthState | undefined,
    action: Action
): AuthState {
    return reducer(state, action);
}
