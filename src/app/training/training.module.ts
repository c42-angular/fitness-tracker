import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { TrainingComponent } from "./training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { StopTrainingConfirmComponent } from "./current-training/stop-training-confirm.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingConfirmComponent
    ],
    imports: [
        AngularFirestoreModule,
        SharedModule
    ],
    entryComponents: [
        StopTrainingConfirmComponent
    ]
})
export class TrainingModule {

}