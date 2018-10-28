import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    template: 
    `<h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>You already got {{this.dialogData.progress}}%</mat-dialog-content>
    <mat-dialog-actions>
        <button mat-button mat-dialog-close="no">No</button>
        <!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->
        <button mat-button mat-dialog-close="yes">Yes</button>
    </mat-dialog-actions>`
})
export class StopTrainingConfirmComponent {
 
    constructor(
        //public dialogRef: MatDialogRef<StopTrainingConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    }

    // closeDialog() {
    //     this.dialogRef.close();
    // }
}