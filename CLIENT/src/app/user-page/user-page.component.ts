import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { Observable } from 'rxjs';
import { IUser } from '../user/reducer_user';
import { startShopingAction } from '../shopping_bag/shopping_bag_actions';
import { IBagProduct } from '../shopping_bag/reducer_shopping_bag';
import { LoadProductsActoin } from '../products/actions_products';



@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  isLogedIn$: Observable<boolean>
  user$: Observable<IUser>
  bag_products$: Observable<IBagProduct[]>
  bag$: Observable<boolean>
  start_shoping$: Observable<boolean>


  opened = false

  constructor(
    private state: Store<IState>
  ) {
    this.bag_products$ = this.state.select(state => state.bag.products);
    this.user$ = this.state.select(state => state.user.user);

    this.bag$ = this.state.select(state => state.user.shopping_bag)
  }

  ngOnInit(): void {
    const category = 'apparel';

    this.state.dispatch(LoadProductsActoin({ category }));

    this.user$ = this.state.select(state => state.user.user)
    this.start_shoping$ = this.state.select(state=> state.bag.start_shopping)
  }
  startShoping() {
    this.state.dispatch(startShopingAction())
  }

}
