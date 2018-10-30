import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopTrainingConfirmComponent } from './stop-training-confirm.component';
import { TrainingService } from '../training.service';
import { Training } from '../training.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progressPercent = 0;
  interval;
  currentTraining: Training;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.currentTraining = this.trainingService.getCurrentTraining();
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const steps = (this.currentTraining.duration/60) * 1000;

    this.interval = setInterval(() => {
      if (this.progressPercent >= 100) {
        clearInterval(this.interval);
        this.trainingService.completeTraining();
        return;
      }
      this.progressPercent += 1;
    }, steps);
  }

  stopTraining() {
    clearInterval(this.interval);

    const dialogRef = this.dialog.open(StopTrainingConfirmComponent, {
      width: '250px',
      data: {
        progress: this.progressPercent
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === "yes") {
        this.trainingService.cancelTraining(this.progressPercent);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
