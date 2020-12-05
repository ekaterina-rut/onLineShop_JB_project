import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, LoginDetailsInterface } from '../user/reducer_user';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { showUserErrorAction, startRegistrationAction } from '../user/actions_user';
import { showErrorAction } from '../order/actions_order';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {

  loginUserDetails: Pick<IUser, 'email' | 'id' | 'password'>


  constructor(
    private store: Store<IState>,
    private fb: FormBuilder
  ) { }

  registrationForm = this.fb.group({
    id: ['', [Validators.required, Validators.min(100000000), Validators.max(999999999)]],
    email: ['', [Validators.email, Validators.required]],
    password: this.fb.group(
      {
        first_password: ['', Validators.required],
        repeat_password: ['']
      }, { validator: this.checkPasswords })
  })

  checkPasswords(group: FormGroup) {
    let pass = group.get('first_password').value;
    let confirmPass = group.get('repeat_password').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  checkId(id) {
    if (id.length !== 9) {
      return false
    }
    if (id.length === 9) {
      return true
    }
  }
  checkFeilds(): void {
    if (this.registrationForm.status === "INVALID") {
      const msg = 'pls fill all requested fields'
      this.store.dispatch(showUserErrorAction({ msg }))
      return
    }
  }

  onSubmit() {
    const loginDetails = this.registrationForm.value;
    const id = loginDetails.id;
    const email = loginDetails.email;
    const password = loginDetails.password.first_password
    this.store.dispatch(startRegistrationAction({ id, email, password }))

  }
}

