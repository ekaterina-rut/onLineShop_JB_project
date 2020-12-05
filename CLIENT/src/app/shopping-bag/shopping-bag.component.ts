import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
// import { IBagProduct } from '../products/reducer_products';
import { IUser } from '../user/reducer_user';
import { emptyBagAction } from '../shopping_bag/shopping_bag_actions';
import { IBagProduct } from '../shopping_bag/reducer_shopping_bag';
import { showOrderAction } from '../order/actions_order';
// import { emptyBagAction } from '../products/actions_products';



@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.css']
})
export class ShoppingBagComponent implements OnInit {
  bag_products$: Observable<IBagProduct[]>
  user$: Observable<IUser>
  sum$: Observable<number>
  shopping_bag$: Observable<boolean>
  is_bag_empty$: Observable<number>
  msg$: Observable<string>


  constructor(
    private state: Store<IState>,

  ) {
    this.shopping_bag$ = this.state.select(state => state.user.shopping_bag)
    this.bag_products$ = this.state.select(state => state.bag.products)
    this.user$ = this.state.select(state => state.user.user)
    this.sum$ = this.state.select(state => state.bag.total)
    this.is_bag_empty$ = this.state.select(state => state.bag.products.length)
    this.msg$ = this.state.select(state => state.bag.inform_msg)


  }

  emptyBag(): void {
    this.state.dispatch(emptyBagAction())
  }
  placeOrder() {
    this.state.dispatch(showOrderAction())
  }
  ngOnInit(): void {

  }

}
