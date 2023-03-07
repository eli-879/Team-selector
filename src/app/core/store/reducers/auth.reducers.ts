import { Action, createReducer } from '@ngrx/store';
import { User } from '../../models/user.class';

export interface State {
    isAuthenticated: boolean;
    user: User | null;
    errorMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};

const reducer = createReducer(initialState);

export function authReducer(state: State | undefined, action: Action): State {
    return reducer(state, action);
}
