import { Component, OnInit } from '@angular/core';
import { IState } from '../app.module';
import { Store } from '@ngrx/store';
import { downloadAction } from '../order/actions_order';
import { Observable } from 'rxjs';
import { OrderStateInterface } from '../order/reducer_order';
import { Router } from '@angular/router';




@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {

  order$: Observable<OrderStateInterface>
  order_id$: Observable<string>
  url$: Observable<string>


  constructor(
    private state: Store<IState>,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.order$ = this.state.select(state => state.order)
    this.order_id$ = this.state.select(state => state.order._id)
    this.url$ = this.state.select(state => state.order.url)
  }

  download(url): void {
    this.state.dispatch(downloadAction({ url }))

  }


  download2(): void {
  }

  home(): void {
    this.router.navigateByUrl('/home');
  }

}
