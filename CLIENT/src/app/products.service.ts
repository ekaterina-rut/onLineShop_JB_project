import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from './products/reducer_products';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IState } from './app.module';


const PRODUCT_API = 'http://localhost:4000/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private state: Store<IState>
  ) { }

  // Authorization: Bearer TOKEN_STRING

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAllProductsService(category: string): Observable<{ response: any }> {
    return this.http.get<any>(`${PRODUCT_API}/${category}`,
      {
        headers: this.getHeaders(),
      }
    )
  }

  getProductsService(): Observable<{ response: any }> {
    return this.http.get<any>('http://localhost:4000/items')
  }
  
  saveUpdatedProductService(product: IProduct): Observable<{ response: any }> {
    const product_id = product._id
    return this.http.post<any>(`${PRODUCT_API}/editProduct`, { product },
      {
        headers: this.getHeaders()
      })
  }

  addProduct(new_product: Omit<IProduct, 'id'>): Observable<IProduct> {

    return this.http.post<any>(`${PRODUCT_API}/addProduct`, { new_product }, {
      headers: this.getHeaders(),
    })
  }

  searchService(search: string): Observable<{ response: any }> {

    return this.http.post<any>(`${PRODUCT_API}/search`, { search }, {
      headers: this.getHeaders(),
    })
  }
}


