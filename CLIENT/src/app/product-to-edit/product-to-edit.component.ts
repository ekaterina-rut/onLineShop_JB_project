import { Component, OnInit, Input, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { Observable } from 'rxjs';
import { IProduct } from '../products/reducer_products';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { clearProductToEditAction, getAllProductsAction, getProductsConfirmAction, LoadProductsActoin, showErrorProductAction, updateProductAction } from '../products/actions_products';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-product-to-edit',
  templateUrl: './product-to-edit.component.html',
  styleUrls: ['./product-to-edit.component.css']
})
export class ProductToEditComponent implements OnInit {
  @Input() product: IProduct;

  product_to_edit$: Observable<IProduct>
  name$: Observable<string>
  err_msg$: Observable<string>

  editProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  });

  constructor(
    private state: Store<IState>

  ) { }

  ngOnInit(): void {
    this.product_to_edit$ = this.state.select(state => state.products.product_to_edit)
    this.editProductForm.setValue({
      name: this.product.name,
      price: this.product.price,
      img: this.product.img,
      category: this.product.category
    });
    this.err_msg$ = this.state.select(state => state.order.err_msg)


  }

  getData() {
    this.editProductForm.setValue({
      name: this.product.name,
      price: this.product.price,
      img: this.product.img,
      category: this.product.category

    })
  }


 async onSubmit(product_to_edit) {
    if (!this.editProductForm.controls.name.value.length) {
      const msg = 'pls fill a product name';
      return this.state.dispatch(showErrorProductAction({ msg }))
    }
    if (!this.editProductForm.controls.price.value) {
      const msg = 'pls fill a product price';
      return this.state.dispatch(showErrorProductAction({ msg }))
    }
    if (!this.editProductForm.controls.category.value.length) {
      const msg = 'choose a category';
      return this.state.dispatch(showErrorProductAction({ msg }))
    }
    if (!this.editProductForm.controls.img.value.length) {
      const msg = 'add picture url';
      return this.state.dispatch(showErrorProductAction({ msg }))
    }
    const updated_product = {
      _id: product_to_edit._id,
      name: this.editProductForm.value.name,
      category: this.editProductForm.value.category,
      price: this.editProductForm.value.price,
      img: this.editProductForm.value.img,
    }
    const category = updated_product.category
    this.state.dispatch(updateProductAction({ updated_product }))
  }
  close() {
    this.state.dispatch(clearProductToEditAction())
  }

}
