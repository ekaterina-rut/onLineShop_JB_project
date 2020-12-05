import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../products/reducer_products';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { uploadProductAction } from '../products/actions_products';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: IProduct;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  });
  constructor(
    private store: Store<IState>,
  ) { }


  onSubmit() {
    const new_product = this.productForm.value;
    this.store.dispatch(uploadProductAction({ new_product }));
  }

}
