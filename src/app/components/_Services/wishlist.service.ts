import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wishlist } from '../_Models/Wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  baseUrl = "http://localhost:3000/wishlist";

  public token: any = localStorage.getItem('access_token');
  constructor(private http: HttpClient) { }
  
  addWishlist(nwishlist:Wishlist) {
    return this.http.post<Wishlist>(this.baseUrl, nwishlist, { headers: { authorization: this.token } });

  }
 
  
getAllProductsWishlist() {            
  return this.http.get<Wishlist[]>(this.baseUrl+"/",{} );
}

deleteWishlistById(id: string){
    return this.http.delete<Wishlist>("/unlike/"+id, { headers: { authorization: this.token } });
  }

}
