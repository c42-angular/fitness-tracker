import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StopTrainingConfirmComponent } from './stop-training-confirm.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingStopped = new EventEmitter();
  progressPercent = 0;
  interval;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    this.interval = setInterval(() => {
      if (this.progressPercent >= 100) {
        clearInterval(this.interval);
        return;
      }
      this.progressPercent += 20;
      console.log("Progress: " + this.progressPercent + " %");
    }, 1000);
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
        this.trainingStopped.emit();
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
