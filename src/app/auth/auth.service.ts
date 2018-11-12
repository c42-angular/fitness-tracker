import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { UiService } from '../shared/ui.service';
import { TrainingService } from '../training/training.service';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
    authEvent = new Subject<boolean>();
    private user: User;
    private isAuthenticated = false;
    
    constructor(private router: Router, private afAuth: AngularFireAuth, private uiService: UiService, 
                    private trainingService: TrainingService, private store: Store<{ui: fromApp.State}>){}

    initAuthSubscriptions() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authEvent.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authEvent.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    register(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});

        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
            success => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
            },
            error => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackBar(error, 3000);
            }
        );
    }

    login(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});

        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
            success => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
            },
            error => {
                //this.uiService.loadingStateChanged.next(false);
                this.store.dispatch({type: 'STOP_LOADING'});
                this.uiService.showSnackBar(error, 3000);
            }
        );
    }    

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}