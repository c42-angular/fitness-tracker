import { Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";

import { Training } from "./training.model";
import { Injectable } from "@angular/core";

@Injectable()
export class TrainingService {
    public trainingChanged = new Subject<Training>();
    private availableTrainings: Training[] = [];
    //     { id: 1, name: 'Crunches', duration: 30, calories: 100 },
    //     { id: 2, name: 'Squats', duration: 120, calories: 300 },
    //     { id: 3, name: 'Sit-ups', duration: 300, calories: 500 },
    //     { id: 4, name: 'Yoga', duration: 600, calories: 275 }
    // ];
    private pastTrainings: Training[] = [];
    private currentTraining: Training;

    constructor(db: AngularFirestore){
       db.collection('availableTrainings')
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return {
                            id, 
                            name: data['name'], 
                            calories: data['calories'], 
                            duration: data['duration']
                        };
                    }
                )}
            )
            ).subscribe(trainings => {
                console.log(trainings);
            });        
    }

    getAvailableTrainings() {
        return this.availableTrainings.slice();
    }

    selectNewTraining(trainingId: number) {
        this.currentTraining = this.availableTrainings.find(t => t.id === trainingId);
        this.trainingChanged.next(this.getCurrentTraining());
    }

    getCurrentTraining() {
        return {...this.currentTraining};
    }

    completeTraining() {
        const completedTraining: Training = {
            ...this.currentTraining, 
            date: new Date(),
            state: 'completed'
        };
        this.pastTrainings.push(completedTraining);

        this.currentTraining = null;
        this.trainingChanged.next(null);
        console.log(completedTraining);
    }

    cancelTraining(progress: number) {
        const cancelledTraining: Training = {
            ...this.currentTraining, 
            date: new Date(),
            duration: this.currentTraining.duration * progress / 100,
            calories: this.currentTraining.calories * progress / 100,
            state: 'cancelled'
        };
        this.pastTrainings.push(cancelledTraining);

        this.currentTraining = null;
        this.trainingChanged.next(null);
        console.log(cancelledTraining);
    }

    getPastTrainings() {
        return this.pastTrainings.slice();
    }
}