import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IState } from '../app.module'
import { Store } from '@ngrx/store';
import {logout} from './../user/actions_user'
import { Observable } from 'rxjs';
import { IUser } from '../user/reducer_user';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  user$: Observable<IUser>
  is_logged_out$: Observable<boolean>
  is_logged_in$: Observable<boolean>
  admin$: Observable<boolean>

  constructor(
    private router: Router,
    private state: Store<IState>,
    private qty_popap: MatDialog,
  ) { }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('bag');
    this.state.dispatch(logout());
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.user$ = this.state.select(state=> state.user.user)
    this.is_logged_out$ = this.state.select(state=> state.user.isLoggedOut)
    this.is_logged_in$ = this.state.select(state=> state.user.isLogedIn)
    this.admin$ = this.state.select(state=> state.user.admin)
  }

  addProduct() {
    const qty_popapRef = this.qty_popap.open(AddProductComponent);
  }
}