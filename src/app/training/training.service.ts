import { Subject } from "rxjs";

import { Training } from "./training.model";

export class TrainingService {
    public trainingSelected = new Subject<Training>();
    private availableTrainings: Training[] = [
        { id: 1, name: 'Crunches', duration: 30, calories: 100 },
        { id: 2, name: 'Squats', duration: 120, calories: 300 },
        { id: 3, name: 'Sit-ups', duration: 300, calories: 500 },
        { id: 4, name: 'Yoga', duration: 600, calories: 275 }
    ];

    getAvailableTrainings() {
        return this.availableTrainings.slice();
    }

    selectNewTraining(trainingId: number) {
        console.log(trainingId);
        const selectedTraining = this.availableTrainings.find(t => t.id === trainingId);
        console.log(selectedTraining);
        this.trainingSelected.next(selectedTraining);
    }
}