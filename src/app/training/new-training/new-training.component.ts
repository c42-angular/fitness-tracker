import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Training } from '../training.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTrainings: Training[] = [];
  trainingSubscription: Subscription;
  isLoading = true;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingService.trainingsChanged.subscribe(trainings => {
      this.availableTrainings = trainings;
      this.isLoading = false;
    });

    this.trainingService.fetchAvailableTrainings();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.selectNewTraining(form.value.selectedTraining);
  }

  ngOnDestroy(): void {
    this.trainingSubscription.unsubscribe();
  }  
}
