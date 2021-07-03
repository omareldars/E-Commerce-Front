import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Cart } from "../_Models/Cart";
import { Category } from "../_Models/Category";
import { Product } from "../_Models/Product";
import { Cartitem } from "./../_Models/Cartitem";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public token: any = localStorage.getItem("access_token");
  private cartLists: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}

  baseUrl = environment.backendbaseUrl + "cart";

  getcartData() {
    return this.cartLists.asObservable();
  }
  updatecartData(products) {
    this.cartLists.next(products);
  }

  add(nCart: Cart) {
    return this.http.post<Cart>(this.baseUrl + "/add/", nCart, {
      headers: { authorization: this.token },
    });
  }

  deleteById(id: string) {
    return this.http.delete<Cart>(this.baseUrl + "/delete/" + id, {
      headers: { authorization: this.token },
    });
  }

  getCartById(id: string) {
    return this.http.get<Cart>(this.baseUrl + "/" + id, {
      headers: { authorization: this.token },
    });
  }
  addToCart(id: string, ncart: Cart) {
    return this.http.post<Cart>(this.baseUrl + "/add/" + id, ncart, {
      headers: { authorization: this.token },
    });
  }

  removeFromCart(cart_id: string, product_id: string) {
    return this.http.delete<Cart>(
      this.baseUrl + "/delete/" + cart_id + "/" + product_id,
      { headers: { authorization: this.token } }
    );
  }
  mycart() {
    return this.http.get(this.baseUrl + "/mycart", {
      headers: { authorization: this.token },
    });
  }
  usercart() {
    return this.http.get(this.baseUrl + "/usercart", {
      headers: { authorization: this.token },
    });
  }
  increase(cartId: any, productId: any, qty: any) {
    return this.http.put(
      this.baseUrl + "/increase/" + cartId + "/" + productId + "/" + qty,
      {}
    );
  }
  decrease(cartId: any, productId: any, qty: any) {
    return this.http.put(
      this.baseUrl + "/decrease/" + cartId + "/" + productId + "/" + qty,
      {}
    );
  }
}
