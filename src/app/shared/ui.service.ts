import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Subject } from "rxjs";

@Injectable()
export class UiService {
    loadingStateChanged = new Subject<boolean>();
    
    constructor(private snackBar: MatSnackBar){}

    showSnackBar(message: string, duration: number) {
        this.snackBar.open(message, null, {
            duration: duration
        });
    }
}