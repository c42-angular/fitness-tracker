import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  trainingInProgress = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.trainingChanged.subscribe(newTraining => {
      console.log('Message is ' + newTraining);
      console.log('Boolean is ' + (newTraining != null));
      this.trainingInProgress = newTraining != null;
    });
  }

}
