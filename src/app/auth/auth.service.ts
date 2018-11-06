import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { UiService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    authEvent = new Subject<boolean>();
    private user: User;
    private isAuthenticated = false;
    
    constructor(private router: Router, private afAuth: AngularFireAuth, private uiService: UiService){}

    register(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);

        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
            success => {
                this.uiService.loadingStateChanged.next(false);
                this.proceedToLogin();
            },
            error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error, 3000);
            }
        );
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);

        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
            success => {
                this.uiService.loadingStateChanged.next(false);
                this.proceedToLogin();
            },
            error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackBar(error, 3000);
            }
        );
    }    

    proceedToLogin() {
        this.isAuthenticated = true;
        this.authEvent.next(this.isAuth());
        this.router.navigate(['/training']);
    }

    logout() {
        this.afAuth.auth.signOut();
        this.isAuthenticated = false;
        this.authEvent.next(this.isAuth());
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.isAuthenticated;
    }
}