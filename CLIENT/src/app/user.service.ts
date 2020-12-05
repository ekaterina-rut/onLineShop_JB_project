import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const USER_API = 'http://localhost:4000/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  creactAdminService():Observable<any>{
    return this.http.post<any>(`${USER_API}/create_admin`,{})
  }


  startRegistrationService(id: number, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${USER_API}/register`, { id, email, password })
  }

  proceedRegistrationService(
    _id: string,
    first_name: string,
    last_name: string,
    city: string,
    street: string
  ): Observable<any> {
    return this.http.post<any>(`${USER_API}/register-proceed`, { _id, first_name, last_name, city, street })
  }

  startLoginService(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${USER_API}/login`, { email, password })
  }

  startCheckLS_Service(): Observable<any> {
    const authorisation = localStorage.getItem('user');

    return JSON.parse(authorisation)
  }

  constructor(
    private http: HttpClient,
  ) { }
}

