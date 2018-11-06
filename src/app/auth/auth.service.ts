import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { auth } from 'firebase';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Injectable()
export class AuthService {
    authEvent = new Subject<boolean>();
    private user: User;
    private isAuthenticated = false;
    
    constructor(private router: Router, private afAuth: AngularFireAuth){}

    register(authData: AuthData) {
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
            success => this.proceedToLogin(),
            error => console.log(error)
        );
    }

    login(authData: AuthData) {
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
            success => this.proceedToLogin(),
            error => console.log(error)            
        );

        this.proceedToLogin();
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