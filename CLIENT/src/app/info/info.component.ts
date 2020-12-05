import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../products/reducer_products';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { getAllProductsAction } from '../products/actions_products';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  products$: Observable<IProduct[]>
  total_orders$:Observable<number>

  constructor(
    private state: Store<IState>
  ) { }

  ngOnInit(): void {
    this.products$ = this.state.select(state => state.products.products);
    this.total_orders$ = this.state.select(state=> state.products.total_orders)
    this.state.dispatch(getAllProductsAction());
  }

}
