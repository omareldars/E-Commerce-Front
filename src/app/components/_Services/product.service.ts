import { HttpClient } from "@angular/common/http";
import { User } from "../_Models/User";
import { Product } from "../_Models/Product";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ProductService {
  public token: any = localStorage.getItem("access_token");
  constructor(private http: HttpClient) {}
  baseUrl = environment.backendbaseUrl + "products";

  add(nproduct: FormData) {
    return this.http.post<Product>(this.baseUrl + "/add", nproduct, {
      headers: { authorization: this.token },
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/home");
  }
  editProduct(id: string, product: any) {
    return this.http.put<Product>(this.baseUrl + "/" + id, product, {
      headers: { authorization: this.token },
    });
  }
  deleteById(id: string) {
    return this.http.delete<Product>(this.baseUrl + "/delete/" + id, {
      headers: { authorization: this.token },
    });
  }
  getProductById(id: string) {
    return this.http.get<Product>(this.baseUrl + "/" + id
  );
  }

  //  searchby(search: string) {
  //   return this.http.get<Product[]>("http://localhost:3000/products/search/" + search, { headers: { authorization: this.token } });
  // }

  searchbyTitle(search: string) {
    return this.http.get<Product[]>(`${this.baseUrl}/title/` + search);
  }

  addToCart(payload: any) {
    return this.http.post(`baseUrl/orders`, payload);
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

  
}
