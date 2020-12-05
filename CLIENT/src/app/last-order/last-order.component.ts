import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IOrderProduct } from '../order/reducer_order';

import { IState } from '../app.module';

@Component({
  selector: 'app-last-order',
  templateUrl: './last-order.component.html',
  styleUrls: ['./last-order.component.css']
})
export class LastOrderComponent implements OnInit {
  @Input() id_product: string;
 last_order_products$?: Observable<IOrderProduct>


  constructor(
    private state: Store<IState>

  ) { }

  ngOnInit(): void {
    this.last_order_products$ = this.state.select(
      state => {
        return state.user.last_order.order_products.find(product => product.id_product === this.id_product)
      }
    )
  }

}
