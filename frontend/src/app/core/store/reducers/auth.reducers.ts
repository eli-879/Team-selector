import { Action, createReducer, on } from '@ngrx/store';
import { FetchState } from '../../models/fetch-state.enum';
import * as actions from '../actions/auth.actions';

export interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    errorMessage: string | null;
    fetchState: FetchState | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    fetchState: null,
};

const reducer = createReducer(
    initialState,
    on(actions.login, (state): AuthState => {
        return { ...state, fetchState: FetchState.Loading };
    }),
    on(actions.loginSuccess, (state): AuthState => {
        return {
            ...state,
            isAuthenticated: true,
            fetchState: FetchState.Success,
        };
    }),

    on(actions.loginFailure, (state): AuthState => {
        return {
            ...state,
            errorMessage: 'Incorrect email and/or password.',
            fetchState: FetchState.Error,
        };
    }),
    on(actions.signupSuccess, (state, response): AuthState => {
        return {
            ...state,
            isAuthenticated: true,
            user: { token: response.token, email: 'e' },
            fetchState: FetchState.Success,
        };
    }),
    on(actions.signupFailure, (state): AuthState => {
        return {
            ...state,
            errorMessage: 'Incorrect email and/or password.',
            fetchState: FetchState.Error,
        };
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
