import { Action } from "@ngrx/store";

import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, AuthActions } from './auth.actions';

export interface AuthState {
    isAuthenticated: boolean
}

const initialState: AuthState = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };

        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            };

        default:
            return state;
    }
}

export const getIsAuth = (state: AuthState) => state.isAuthenticated;