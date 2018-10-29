import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  emailInput = new FormControl("", [Validators.required, Validators.email]);
  passwordInput = new FormControl("", Validators.required);

  constructor(fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: this.emailInput,
      password: this.passwordInput
    });
   }

   onSubmit() {
     console.log(this.loginForm);
     this.authService.login({
       email: this.loginForm.value.email,
       password: this.loginForm.value.password
     });
   }
}
