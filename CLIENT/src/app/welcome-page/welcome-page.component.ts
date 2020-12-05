import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../app.module';
import { Router } from '@angular/router';
import { creact_admin_action } from '../user/actions_user';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  is_loged_in$: Observable<boolean>
  is_logged_out$: Observable<boolean>
  info_msg$: Observable<string>
  admin$: Observable<boolean>
 

  constructor(
    private state: Store<IState>,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.is_loged_in$ = this.state.select(state => state.user.isLogedIn)
    this.is_logged_out$ = this.state.select(state => state.user.isLoggedOut)
    this.info_msg$ = this.state.select(state => state.user.inform_msg)
    this.admin$ = this.state.select(state=> state.user.admin)
  }

  backToShopping(): void {
    this.router.navigateByUrl('/user-page');

  }

  backToProducts(): void {
    this.router.navigateByUrl('/admin-page')
  }

  creact_admin(): void{
    
    this.state.dispatch(creact_admin_action())

  }

}
