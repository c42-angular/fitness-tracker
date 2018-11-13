import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { map } from 'rxjs/operators';
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";

import { Training } from "./training.model";
import * as fromRoot from './../app.reducer';
import * as TrainingActions from './training.actions';

@Injectable()
export class TrainingService {
    public finishedTrainingsChanged = new Subject<Training[]>();
    private firebaseSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private store: Store<fromRoot.State>){}

    fetchAvailableTrainings() {
        var subscription =  this.db.collection('availableTrainings')
            .snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data();
                        const id = a.payload.doc.id;
                        return {
                            id: id, 
                            name: data['name'], 
                            duration: data['duration'],
                            calories: data['calories'] 
                        };
                    }
                )}
            ))
            .subscribe((trainings: Training[]) => {
                console.log(`Got ${trainings.length} trainings from server`);
                this.store.dispatch(new TrainingActions.SetAvailableTrainings(trainings));
            }, error => {
                console.error(`Error getting trainings from server`);
                console.error(error);
            });   
        
        this.firebaseSubs.push(subscription);
    }

    selectNewTraining(trainingId: string) {
        this.store.dispatch(new TrainingActions.StartTraining(trainingId));
    }

    getCurrentTraining() {
        // return {...this.currentTraining};
        return null;
    }

    completeTraining() {
/* TODO        
        const completedTraining: Training = {
            ...this.currentTraining, 
            date: new Date(),
            state: 'completed'
        };

        this.saveFinishedTraining(completedTraining);
*/
        // this.currentTraining = null;
        // this.trainingChanged.next(null);
        this.store.dispatch(new TrainingActions.StopTraining());
        //console.log(completedTraining);    
    }

    cancelTraining(progress: number) {
/*
        TODO
        const cancelledTraining: Training = {
            ...this.currentTraining, 
            date: new Date(),
            duration: this.currentTraining.duration * progress / 100,
            calories: this.currentTraining.calories * progress / 100,
            state: 'cancelled'
        };
        

        this.saveFinishedTraining(cancelledTraining);
*/
        // this.currentTraining = null;
        // this.trainingChanged.next(null);
        this.store.dispatch(new TrainingActions.StopTraining());
        //console.log(cancelledTraining);    
    }

    fetchPastTrainings() {
        //return this.pastTrainings.slice();

        var subscription = this.db.collection('finishedTrainings')
            .valueChanges()        
            .subscribe((trainings: Training[]) => {
                //this.finishedTrainingsChanged.next(trainings);
                this.store.dispatch(new TrainingActions.SetFinishedTrainings(trainings));
            }, error => {
                //console.log(error);
            });        
        
        this.firebaseSubs.push(subscription);
    }

    private saveFinishedTraining(training: Training) {

        this.db.collection('finishedTrainings').add(training);
    }

    cancelSubscriptions() {
        this.firebaseSubs.forEach(sub => sub.unsubscribe());
    }
}