import { Inject, Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { Observable } from 'rxjs';
import { addProductToBagAction } from '../shopping_bag/shopping_bag_actions';



@Component({
  selector: 'app-qty-popap',
  templateUrl: './qty-popap.component.html',
  styleUrls: ['./qty-popap.component.css']
})
export class QtyPopapComponent implements OnInit {
  qty: number;
  user_id$: Observable<string>

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private state: Store<IState>
  ) {


  }

  ngOnInit(): void {
    this.user_id$ = this.state.select(state => state.user.user._id);


  }

  addQty(qty: number, product_id: string, user_id: string) {
    this.state.dispatch(addProductToBagAction({ qty, product_id, user_id }))
  }

  validateNumber(qty: number) {
    if (!(qty > 0)) {
      return true
    }
    return false
  }

}
