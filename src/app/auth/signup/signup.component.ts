import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-state/app.state';
import { toggleSpinner } from 'src/app/shared/state/shared.actions';
import { loginCheck, signupCheck } from '../state/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //signUpForm: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.signUpForm = new FormGroup({
    //   email: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required]),
    // })
  }

  onSignUp() {
    // const email = this.signUpForm.value.email;
    // const password = this.signUpForm.value.password;
    // show spinner
    this.store.dispatch(toggleSpinner({ show: true }));
    // login action dispatched
    this.store.dispatch(signupCheck({ email: 'feyre@gmail.com', password: '123456' }));
  }

}
