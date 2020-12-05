import { Component, OnInit } from '@angular/core';
import { IUser } from '../user/reducer_user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { Observable } from 'rxjs';
import { proceedRegistrationAction, showUserErrorAction } from '../user/actions_user';


@Component({
  selector: 'app-registration-proceed',
  templateUrl: './registration-proceed.component.html',
  styleUrls: ['./registration-proceed.component.css']
})
export class RegistrationProceedComponent implements OnInit {

  personalDetails: Omit<IUser, 'email' | 'id' | 'password'>;
  user_id$: Observable<string>;

  registrationForm = new FormGroup({
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
  })

  constructor(
    private state: Store<IState>
  ) { }

  ngOnInit(): void {
    this.user_id$ = this.state.select(state => state.user.user._id)
  }

  onSubmit(_id) {
    if (this.registrationForm.status === "INVALID") {
      const msg = 'pls fill all requested fields'
      this.state.dispatch(showUserErrorAction({ msg }))

      return
    }
    const personalDetails = this.registrationForm.value;
    const first_name = personalDetails.first_name;
    const last_name = personalDetails.last_name;
    const city = personalDetails.city;
    const street = personalDetails.street;
    this.state.dispatch(proceedRegistrationAction({
      _id,
      first_name,
      last_name,
      city,
      street
    }))

  }

}
