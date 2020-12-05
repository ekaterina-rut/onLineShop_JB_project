import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IState } from '../app.module';
import { showUserErrorAction, startLoginAction } from '../user/actions_user';
import { getAllProductsAction } from '../products/actions_products';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private store: Store<IState>

  ) { }

  onSubmit() {
    const loginDetails = this.loginForm.value;
    if(!this.loginForm.controls.email.value.length){
      const msg = "pls enter e-mail";
      this.store.dispatch(showUserErrorAction({msg}))
      return
    }
    if(!this.loginForm.controls.password.value.length){
      const msg = "pls enter a password";
      this.store.dispatch(showUserErrorAction({msg}))
      return
    }
    const email = loginDetails.email;
    const password = loginDetails.password;
    this.store.dispatch(startLoginAction({email, password}))
  }

  ngOnInit(): void {
    // this.store.dispatch(getAllProductsAction());

  }

}
