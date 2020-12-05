import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { LoadProductsActoin } from '../products/actions_products';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit {
  categories$: Observable<string[]>

  constructor(
    private state: Store<IState>
  ) { }

  ngOnInit(): void {
    this.categories$ = this.state.select(state => state.products.categories);
  }

  pickCategory(category: string) {
    this.state.dispatch(LoadProductsActoin({category}));

  }


}
