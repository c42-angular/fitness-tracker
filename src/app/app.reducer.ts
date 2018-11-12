import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

// application-wide state; holding slices of state corresponding to their reducers
export interface State {
    ui: fromUI.UiState,
    auth: fromAuth.AuthState
}

// grouping all reducer functions
export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
}

const getUIState = createFeatureSelector<fromUI.UiState>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);