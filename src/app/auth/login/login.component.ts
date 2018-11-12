import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  
  private loadingSubscription: Subscription;

  emailInput = new FormControl("", [Validators.required, Validators.email]);
  passwordInput = new FormControl("", Validators.required);

  constructor(fb: FormBuilder, private authService: AuthService, private uiService: UiService, 
                private store: Store<{ui: fromApp.State}>) {
    this.loginForm = fb.group({
      email: this.emailInput,
      password: this.passwordInput
    });
   }

   ngOnInit() {
     this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

     //this.store.subscribe(state => console.log(state));
   }

   onSubmit() {
     console.log(this.loginForm);
     this.authService.login({
       email: this.loginForm.value.email,
       password: this.loginForm.value.password
     });
   }
}
