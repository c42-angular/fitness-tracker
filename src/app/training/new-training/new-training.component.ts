import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrainingService } from '../training.service';
import { Training } from '../training.model';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTrainings$: Observable<Training[]>;
  subscription: Subscription;
  isLoading = true;

  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.availableTrainings$ = this.store.select(fromRoot.getAvailableTrainings);

    this.subscription = this.availableTrainings$.subscribe(x => this.isLoading = false);

    this.trainingService.fetchAvailableTrainings();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.selectNewTraining(form.value.selectedTraining);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }  
}
