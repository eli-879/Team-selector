import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AOC_STORE_KEY } from '../aoc-store.key';
import { AuthState } from '../reducers/auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>(AOC_STORE_KEY);

export const selectErrorMessage = createSelector(
    selectAuthState,
    (state) => state.errorMessage
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => state.isAuthenticated
);
