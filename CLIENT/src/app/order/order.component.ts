import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderProduct } from './reducer_order';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { IUser } from '../user/reducer_user';
import { FormBuilder, FormGroup, FormControl, Validators, Validator } from '@angular/forms';
import { placeOrderAction, showErrorAction } from './actions_order';
import { Router } from '@angular/router';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order_products$: Observable<IOrderProduct[]>
  show_order$: Observable<boolean>
  total$: Observable<number>
  city$: Observable<string>
  user$: Observable<IUser>
  city: string = '';
  street: string = '';
  msg$: Observable<string>;
  err_msg$: Observable<string>;
  shopping_bag$: Observable<boolean>


  orderForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', Validators.required),
    delivery_date: new FormControl('', Validators.required),
    credit_card: new FormControl('', Validators.required),
  });


  constructor(
    private state: Store<IState>,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.order_products$ = this.state.select(state => state.order.products)
    this.show_order$ = this.state.select(state => state.order.show_order)
    this.total$ = this.state.select(state => state.order.total_price)
    this.user$ = this.state.select(state => state.user.user)
    this.msg$ = this.state.select(state => state.order.msg)
    this.err_msg$ = this.state.select(state => state.order.err_msg)
    this.shopping_bag$ = this.state.select(state => state.user.shopping_bag)
  }


  overrideForm(user) {
    this.orderForm.patchValue({
      city: user.city,
      street: user.street
    })
  }


  getStreet(user): void {
    const street = user.street
    this.street = street
  }

  onSubmit() {
    const orderDetails = this.orderForm.value;
    if (!this.orderForm.controls.city.value.length) {
      const msg = "pls add city";
      this.state.dispatch(showErrorAction({ msg }))
      this.msg$ = this.state.select(state => state.order.err_msg)
      return
    }
    if (!this.orderForm.controls.street.value.length) {
      const msg = "pls add street";
      this.state.dispatch(showErrorAction({ msg }))
      this.msg$ = this.state.select(state => state.order.err_msg)
      return
    }
    if (!this.orderForm.controls.delivery_date.value.length) {
      const msg = "pls pick a delivery date";
      this.state.dispatch(showErrorAction({ msg }))
      this.msg$ = this.state.select(state => state.order.err_msg)
      return
    }
    if (!this.orderForm.controls.credit_card.value) {
      const msg = "missing a credit card";
      this.state.dispatch(showErrorAction({ msg }))
      this.msg$ = this.state.select(state => state.order.err_msg)
      return
    }
    this.state.dispatch(placeOrderAction({ orderDetails }))
  }

  backShopping(): void {
    this.router.navigateByUrl('/user-page');
  }

}
