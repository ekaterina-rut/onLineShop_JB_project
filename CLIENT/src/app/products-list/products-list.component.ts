import { Component, OnInit } from '@angular/core';
import { IState } from '../app.module';
import { Store } from '@ngrx/store';
import { LoadProductsActoin } from '../products/actions_products';

import { Observable } from 'rxjs';
import { IProduct } from '../products/reducer_products';
import { selectProductsFromState } from '../products/selcetor_products'


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  search: string;
  products$: Observable<IProduct[]>;
  categoty: string = "toys";
  user_id$: Observable<string>;
  clear_search$: Observable<boolean>
  start_search$: Observable<boolean>

  constructor(
    private state: Store<IState>,
  ) {
    this.products$ = state.select(selectProductsFromState);
    this.user_id$ = state.select(state => state.user.user_id);
    this.start_search$ = this.state.select(state => state.products.start_search);
  }


  ngOnInit(): void {
    this.clear_search$ = this.state.select(state => state.products.clear_search);

  }

}
