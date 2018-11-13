import { Action } from "@ngrx/store";

import { Training } from "./training.model";

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

// Store actions with payload!
export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;

    constructor(public payload: Training[]) { }
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;

    constructor(public payload: Training[]) { }
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: string) { }
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

// A new typescript type whose instance can either be instances of these two classes
export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;