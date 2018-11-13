import { Action } from "@ngrx/store";

import { TrainingActions, SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Training } from "./training.model";

export interface TrainingState {
    availableTrainings: Training[];
    finishedTrainings: Training[],
    activeTraining: Training
}

const initialState: TrainingState = {
    availableTrainings: [],
    finishedTrainings: [],
    activeTraining: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state, /// preserve other properties in this state and override only 'availableTrainings' (if not other properties would be lost)
                availableTrainings: action.payload
            };

        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedTrainings: action.payload
            };

        case START_TRAINING:
            return {
                ...state,
                activeTraining: state.availableTrainings.find(t => t.id === action.payload)
            };

        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };

        default:
            return state;
    }
}

export const getAvailableTrainings = (state: TrainingState) => state.availableTrainings;
export const getFinishedTrainings = (state: TrainingState) => state.finishedTrainings;
export const getActiveTraining = (state: TrainingState) => state.activeTraining;