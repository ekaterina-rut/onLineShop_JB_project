import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
import { IProduct } from './products/reducer_products';
import { IUser } from './user/reducer_user';

@Injectable({
  providedIn: 'root'
})
export class FakeServerService implements InMemoryDbService {

  createDb() {
    const users = {
      "5f2e95d1ecb6933c642e63d4": {
        _id: "5f2e95d1ecb6933c642e63d4",
        id: "123456589",
        email: "katya@katya.com",
        password: "123",
        first_name: "katya",
        last_name: "kozirovski",
        city: "tel-aviv",
        street: "mahal",
        orders: [],
        admin: false,
        bag: null,
      }
    };


    const products: IProduct[] = [{
      id: "1",
      name: "doll toy",
      category: 'toys',
      price: 10,
      img: "http"
    }, {
      id: "2",
      name: "baby hat",
      category: 'apparel',
      price: 20,
      img: "http"
    }, {
      id: "4",
      name: "towel",
      category: 'bath',
      price: 30,
      img: "http"
    },
    {
      id: "3",
      name: "pillow",
      category: 'bed',
      price: 15,
      img: "http"
    }]

    return { products }
  }
}




