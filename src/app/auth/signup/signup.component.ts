import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit() {
    //this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.authService.register({
      email: form.value.email,
      password: form.value.password
    });    
  }
}
