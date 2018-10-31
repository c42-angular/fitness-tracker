import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Training } from '../training.model';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource: Training[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource = this.trainingService.getPastTrainings();
  }

}
