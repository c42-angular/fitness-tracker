import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  
  private loadingSubscription: Subscription;

  emailInput = new FormControl("", [Validators.required, Validators.email]);
  passwordInput = new FormControl("", Validators.required);

  constructor(fb: FormBuilder, private authService: AuthService, private uiService: UiService) {
    this.loginForm = fb.group({
      email: this.emailInput,
      password: this.passwordInput
    });
   }

   ngOnInit() {
     this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
   }

   onSubmit() {
     console.log(this.loginForm);
     this.authService.login({
       email: this.loginForm.value.email,
       password: this.loginForm.value.password
     });
   }

   ngOnDestroy() {
     if (this.loadingSubscription) {
       this.loadingSubscription.unsubscribe();
     }
   }
}
