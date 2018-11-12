import { ActionReducerMap } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';

// application-wide state; holding slices of state corresponding to their reducers
export interface State {
    ui: fromUI.State
}

// grouping all reducer functions
export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer
}
