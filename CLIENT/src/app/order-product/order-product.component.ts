import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderProduct } from '../order/reducer_order';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';

@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

  @Input() id_product: string;
  order_product$?: Observable<IOrderProduct>

  constructor(
    private state: Store<IState>
  ) { }

  ngOnInit(): void {

    this.order_product$ = this.state.select(
      state => {
        if (this.id_product) {
          return state.order.products.find(product => product.id_product === this.id_product)
        }
        return
      }
    )
  }
}
