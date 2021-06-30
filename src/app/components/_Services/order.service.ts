import { HttpClient } from '@angular/common/http';
import { User } from '../_Models/User';
import { Order } from '../_Models/Order';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    cardDetails$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor(private http: HttpClient){}
    // addData(foo:any):void{
    //     // I'm using concat here to avoid using an intermediate array (push doesn't return the result array, concat does).
    //     this.cardDetails$.next(this.cardDetails$.getValue().concat([foo]));
    //   }

    addData(foo:any):void{
        this.cardDetails$.next(this.cardDetails$.getValue().concat([foo]));
      }

    public token: any = localStorage.getItem('access_token');
    baseUrl = "http://localhost:3000/orders";

    addToCart(payload: any){
        return this.http.post(`baseUrl/`,payload)
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
}