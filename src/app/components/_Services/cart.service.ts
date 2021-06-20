import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../_Models/Cart';
import {Category} from "../_Models/Category";
import {Product} from "../_Models/Product";


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public token: any = localStorage.getItem('access_token');

  constructor(private http: HttpClient) {
  }

  baseUrl = "http://localhost:3000/cart";

  add(nCart: Cart) {
    return this.http.post<Cart>(this.baseUrl+"/add", nCart, { headers: { authorization: this.token } });
  }

  deleteById(id: string){
    return this.http.delete<Cart>(this.baseUrl+"/delete/"+id,{ headers: { authorization: this.token } });
  }

  getCartById(id: string){
    return this.http.get<Cart>(this.baseUrl+"/"+id, { headers: { authorization: this.token } })
  }

  addToCart(id: string, nitem:Cart){
    return this.http.post<Cart>(this.baseUrl+"/add/"+id, nitem ,{ headers: { authorization: this.token } });
  }

  removeFromCart(cart_id: string, product_id: string){
    return this.http.delete<Cart>(this.baseUrl+"/delete/"+cart_id+"/"+product_id, { headers: { authorization: this.token } } );
  }
  mycart(){
    return this.http.get(this.baseUrl+"/mycart", { headers: { authorization: this.token } } );
  }
}
