import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ORDER_API = 'http://localhost:4000/order';



@Injectable({
  providedIn: 'root'
})
export class OrderService {



  constructor(
    private http: HttpClient,

  ) { }
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  showOrderService(): Observable<any> {
    return this.http.get<any>(`${ORDER_API}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  placeOrderService(orderDetails): Observable<any> {

    return this.http.post<any>(`${ORDER_API}/placeOrder`, { orderDetails },
      {
        headers: this.getHeaders(),
      }
    );
  }

  dowloadService(id_order): Observable<any> {

    // return this.http.get<any>(`${ORDER_API}/download/5f53a42176d6995be4262cea`, {
    //   headers: this.getHeaders()
    // })
    return this.http.get<any>(`${ORDER_API}/download/${id_order}`, {
      headers: this.getHeaders()
    })
  }



}


