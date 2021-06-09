import { HttpClient } from '@angular/common/http';
import { User } from '../_Models/User';
import { Product } from '../_Models/Product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public token: any = localStorage.getItem('access_token');
  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:3000/api/products";

  add(nproduct: FormData) {
    return this.http.post<Product>(this.baseUrl, nproduct, { headers: { authorization: this.token } });

  }

  getAllProducts() {
    return this.http.get<Product[]>(this.baseUrl);
  }
  editProduct(id: string,product: any){
    return this.http.patch<Product>(this.baseUrl+"/"+id,product,{ headers: { authorization: this.token } });
  }
  deleteById(id: string){
    return this.http.delete<Product>(this.baseUrl+"/"+id,{ headers: { authorization: this.token } });
  }
  getProductById(id: string){
    return this.http.get<Product>(this.baseUrl+"/"+id, { headers: { authorization: this.token } })
  }

   searchby(search: string) {
    return this.http.get<Product[]>("http://localhost:3000/api/products/search/" + search, { headers: { authorization: this.token } });
  }

  // omar logic
  addToCart(payload: any){
    return this.http.post(`baseUrl/orders`,payload);
  }

  getCartItem(){
    return this.http.get(`baseUrl/orders`);
  }

  increaseQty(payload: any){
    return this.http.post(`baseUrl/orders`,payload)
  }

  emptyCart(){
    return this.http.delete(`baseUrl/orders/empty-cart`);
  }

//   EditData(eUser: User) {
//     return this.http.patch<User>('http://localhost:3000/users/edit/', eUser, { headers: { authorization: this.token } });
//   }
//   RemoveAc() {
//     return this.http.delete<{ msg: string }>('http://localhost:3000/users/remove', { headers: { authorization: this.token } });
//   }
//   getme() {
//     return this.http.get<User>('http://localhost:3000/users/me', { headers: { authorization: this.token } });
//   }




//   logout() {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('access_id');

//   }
// // method for check if user logged in or not
//   public get loggedIn(): boolean {
//     return (localStorage.getItem('access_token') !== null);
//   }

//   register(newUser: User) {
//     return this.http.post<User>('http://localhost:3000/users/register', newUser);
//   }


















}
