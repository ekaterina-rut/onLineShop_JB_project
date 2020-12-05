import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { IProduct, IBagProduct } from './products/reducer_products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IState } from './app.module';


const BAG_API = 'http://localhost:4000/bag';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBagService {

  constructor(
    private http: HttpClient,
    private state: Store<IState>
  ) { }
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getNewBagService(): Observable<any> {
    return this.http.get<string>(`${BAG_API}/start_shopping`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  addProductToBagService(qty: number, product_id: string, user_id: string): Observable<{ response: any }> {
    return this.http.post<any>(`${BAG_API}/pick/${product_id}`, { qty }, {
      headers: this.getHeaders(),
    });

  }

  removeBagProductService(product_id: string): Observable<{ response: any }> {

    return this.http.delete<any>(`${BAG_API}/delete_product_from_bag/${product_id}`, {
      headers: this.getHeaders(),
    })

  }

  emptyBagSrvice(): Observable<{ response: any }> {

    return this.http.delete<any>(`${BAG_API}/empty_shoping_bag`, {
      headers: this.getHeaders(),
    })

  }

}
