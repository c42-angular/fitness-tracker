import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

@Injectable()
export class AuthService {
    authEvent = new Subject<boolean>();
    private user: User;
    
    constructor(private router: Router){}

    register(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: "id:" + (Math.random() * 100000)
        };
        this.authEvent.next(this.isAuth());
        this.router.navigate(['/training']);
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: "id:" + (Math.random() * 100000)
        };
        this.authEvent.next(this.isAuth());
        this.router.navigate(['/training']);
    }    

    logout() {
        this.user = null;
        this.authEvent.next(this.isAuth());
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.user != null;
    }
}