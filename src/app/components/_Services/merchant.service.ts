import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from './../_Models/Merchant';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  public token: any = localStorage.getItem('access_token');
  constructor(private http: HttpClient) { }

  sellerRequest(newMerchant: Merchant) {
    return this.http.post<Merchant>('http://localhost:3000/merchants/seller-request', newMerchant);
  }



}
