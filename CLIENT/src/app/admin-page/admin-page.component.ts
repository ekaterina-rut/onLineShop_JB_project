import { Component, OnInit } from '@angular/core';
import { IState } from '../app.module';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProduct } from '../products/reducer_products';
import { selectProductsFromState } from '../products/selcetor_products';
import { LoadProductsActoin } from '../products/actions_products';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  isOpen: boolean
  admin$: Observable<boolean>
  products$: Observable<IProduct[]>
  opened$: Observable<boolean>
  product_to_edit$: Observable<IProduct>
  opened = false


  constructor(private state: Store<IState>) { }

  ngOnInit(): void {
    const category = 'apparel';
  
    this.state.dispatch(LoadProductsActoin({category}))
    this.opened$ = this.state.select(state => state.products.isOpen);
    this.admin$ = this.state.select(state => state.user.admin)
    this.products$ = this.state.select(selectProductsFromState);
    this.product_to_edit$ = this.state.select(state => state.products.product_to_edit)
  }
}

