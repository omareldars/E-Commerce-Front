import { HttpClient } from "@angular/common/http";
import { User } from "../_Models/User";
import { Order } from "../_Models/Order";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  baseUrl1 = environment.backendbaseUrl;
  cardDetails$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}
  // addData(foo:any):void{
  //     // I'm using concat here to avoid using an intermediate array (push doesn't return the result array, concat does).
  //     this.cardDetails$.next(this.cardDetails$.getValue().concat([foo]));
  //   }

  addData(foo: any): void {
    this.cardDetails$.next(this.cardDetails$.getValue().concat([foo]));
  }

  public token: any = localStorage.getItem("access_token");
  baseUrl = environment.backendbaseUrl + "orders";

  addToCart(payload: any) {
    return this.http.post(`baseUrl/`, payload);
  }
  getCartItem() {
    return this.http.get(`baseUrl/orders`);
  }

  increaseQty(payload: any) {
    return this.http.post(`baseUrl/orders`, payload);
  }

  emptyCart() {
    return this.http.delete(`baseUrl/orders/empty-cart`);
  }
  createOrder(orderData): Observable<any> {
    return this.http.post(this.baseUrl1 + "orders/add", orderData, {
      headers: { authorization: this.token },
    });
  }
  getOrders(): Observable<any> {
    return this.http.get(this.baseUrl1 + "orders/profile", {
      headers: { authorization: this.token },
    });
  }
  deleteOrderById(orderId): Observable<any> {
    return this.http.delete(this.baseUrl1 + "orders/" + orderId, {
      headers: { authorization: this.token },
    });
  }
  editOrderById(orderId, orderData): Observable<any> {
    return this.http.patch(this.baseUrl1 + "orders/" + orderId, orderData, {
      headers: { authorization: this.token },
    });
  }
  getAdminOrders(): Observable<any> {
    return this.http.get(this.baseUrl1 + "orders/all", {
      headers: { authorization: this.token },
    });
  }
}
