import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IState } from '../app.module';
import { LoadProductsActoin, searchAction } from '../products/actions_products';
import { IProduct } from '../products/reducer_products';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string;
  products$: Observable<IProduct[]>
  products: []

  constructor(
    private state: Store<IState>
  ) { }

  ngOnInit(): void {
  }

  searchProduct(product_search: string): void {
    this.state.dispatch(searchAction({ product_search }))
  }

  clearSearch(): void {
    const category = "apparel"
    this.state.dispatch(LoadProductsActoin({ category }))
    this.search = ''

  }

}
