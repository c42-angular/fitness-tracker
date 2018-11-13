import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromTraining from './training/training.reducer';

// application-wide state; holding slices of state corresponding to their reducers
export interface State {
    ui: fromUI.UiState,
    auth: fromAuth.AuthState,
    training: fromTraining.TrainingState
}

// grouping all reducer functions
export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer,
    training: fromTraining.trainingReducer
}

const getUIStateSlice = createFeatureSelector<fromUI.UiState>('ui');
export const getIsLoading = createSelector(getUIStateSlice, fromUI.getIsLoading);

const getAuthStateSlice = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthStateSlice, fromAuth.getIsAuth);

const getTrainingStateSlice = createFeatureSelector<fromTraining.TrainingState>('training');
export const getAvailableTrainings = createSelector(getTrainingStateSlice, fromTraining.getAvailableTrainings);
export const getFinishedTrainings = createSelector(getTrainingStateSlice, fromTraining.getFinishedTrainings);
export const getActiveTraining = createSelector(getTrainingStateSlice, fromTraining.getActiveTraining);