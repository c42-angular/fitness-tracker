import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  emailInput = new FormControl("", Validators.required);
  passwordInput = new FormControl("", Validators.required);

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      "email": this.emailInput,
      "password": this.passwordInput
    });
   }

   onSubmit() {
     console.log(this.loginForm);
   }
}
