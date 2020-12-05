import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs';
import { IOrder, IUser } from '../user/reducer_user';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { IOrderProduct } from '../order/reducer_order';
import { startShopingAction } from '../shopping_bag/shopping_bag_actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  last_order$: Observable<IOrder>
  last_order_products$: Observable<IOrderProduct[]>
  user$: Observable<IUser>

  constructor(
    private state: Store<IState>,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.last_order$ = this.state.select(state => state.user.last_order)
    this.last_order_products$ = this.state.select(state=> state.user.last_order.order_products)
    this.user$ = this.state.select(state=> state.user.user)
  }

  startShopping():void{
    this.router.navigateByUrl('/user-page');

    this.state.dispatch(startShopingAction())

  }

}
