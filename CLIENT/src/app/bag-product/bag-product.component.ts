
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { removeBagProductAction } from '../shopping_bag/shopping_bag_actions';
import { IBagProduct } from '../shopping_bag/reducer_shopping_bag';

@Component({
  selector: 'app-bag-product',
  templateUrl: './bag-product.component.html',
  styleUrls: ['./bag-product.component.css']
})
export class BagProductComponent implements OnInit {
  @Input() product_id: string;
  @Input() user_id: string;
  user_id$: Observable<string>;
  bag_id$: Observable<string>;
  bag_product$: Observable<IBagProduct>

  constructor(
    private state: Store<IState>,
  ) { }

  ngOnInit(): void {
    this.bag_product$ = this.state.select(
      state => state.bag.products.find(i => i._id === this.product_id)) 
  }

  removeBagProduct() {  
    const product_id = this.product_id;
    this.state.dispatch(removeBagProductAction({ product_id }))
  }
}
