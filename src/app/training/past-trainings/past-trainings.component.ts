import { Component, OnInit, ViewChild } from '@angular/core';

import { TrainingService } from '../training.service';
import { Training } from '../training.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Training>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getPastTrainings();
    this.dataSource.sort = this.sort;
  }

}
