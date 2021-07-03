import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Wishlist } from "../_Models/Wishlist";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private whishLists: BehaviorSubject<any> = new BehaviorSubject(null);
  baseUrl = "http://localhost:3000/wishlist";

  public token: any = localStorage.getItem("access_token");
  constructor(private http: HttpClient) {}

  addWishlist(nwishlist: Wishlist) {
    return this.http.post<Wishlist>(this.baseUrl, nwishlist, {
      headers: { authorization: this.token },
    });
  }
  getwhishesData() {
    return this.whishLists.asObservable();
  }
  updatewhishesData(products) {
    this.whishLists.next(products);
  }

  getAllProductsWishlist() {
    return this.http.get<Wishlist[]>(this.baseUrl + "/", {
      headers: { authorization: this.token },
    });
  }

  deleteWishlistById(id: string) {
    return this.http.delete<Wishlist>(this.baseUrl + "/unlike/" + id, {
      headers: { authorization: this.token },
    });
  }
}
