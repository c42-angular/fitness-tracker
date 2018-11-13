import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  trainingInProgress$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.trainingInProgress$ = this.store.select(fromRoot.getActiveTraining).pipe(map(activeTraining => activeTraining !== null));

    // this.trainingService.trainingChanged.subscribe(newTraining => {
    //   console.log('Message is ' + newTraining);
    //   console.log('Boolean is ' + (newTraining != null));
    //   this.trainingInProgress = newTraining != null;
    // });
  }

}
