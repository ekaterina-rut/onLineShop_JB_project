import {  Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../products/reducer_products';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { editProductAction } from '../products/actions_products';
import { MatDialog } from '@angular/material/dialog';
import { QtyPopapComponent } from '../qty-popap/qty-popap.component';
import { IUser } from '../user/reducer_user';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() id: string;
  qty: number;
  product: IProduct;

  user_id$: Observable<string>;
  user$: Observable<IUser>
  admin$: Observable<boolean>

  product$: Observable<IProduct>
  shopping_bag$: Observable<boolean>


  constructor(
    private state: Store<IState>,
    private qty_popap: MatDialog,
  ) { }

  ngOnInit(): void {
    this.product$ = this.state.select(state => state.products.products.find(i => i._id === this.id));
    this.user$ = this.state.select(state => state.user.user)
    this.admin$ = this.state.select(state => state.user.admin)
    this.shopping_bag$ = this.state.select(state=>state.user.shopping_bag)
  }

  pickProduct(product: IProduct) {
    const qty_popapRef = this.qty_popap.open(QtyPopapComponent, { data: product });
  }

  editProduct(product: IProduct): void {
    this.state.dispatch(editProductAction({ product }))
  }



}


