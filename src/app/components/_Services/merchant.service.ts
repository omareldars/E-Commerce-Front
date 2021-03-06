import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Merchant } from "./../_Models/Merchant";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class MerchantService {
  public token: any = localStorage.getItem("access_token");
  baseUrl = environment.backendbaseUrl + "merchants";
  constructor(private http: HttpClient) {}

  sellerRequest(newMerchant: Merchant) {
    return this.http.post<Merchant>(
      `${this.baseUrl}/seller-request`,
      newMerchant
    );
  }

  approveSeller(merchantId: string) {
    return this.http.put<Merchant>(
      this.baseUrl + "/approve/" + merchantId,
      {},
      { headers: { authorization: this.token } }
    );
  }

  rejectSeller(merchantId: string) {
    return this.http.put<Merchant>(
      this.baseUrl + "/reject/" + merchantId,
      {},
      { headers: { authorization: this.token } }
    );
  }

  // getAllMechants() {
  //   return this.http.get<Merchant[]>(this.baseUrl+"/list",{ headers: { authorization: this.token } });
  // }

  // deleteById(id: string){
  //   return this.http.delete<Merchant>(this.baseUrl+"/delete/"+id,{ headers: { authorization: this.token } });
  // }
  // getCategoryById(id: string){
  //   return this.http.get<Category>(this.baseUrl+"/"+id, { headers: { authorization: this.token } })
  // }

  getAllApprovalMechants() {
    return this.http.get<Merchant[]>(this.baseUrl + "/list", {
      headers: { authorization: this.token },
    });
  }
  getAllwaitingMechants() {
    return this.http.get<Merchant[]>(this.baseUrl + "/list/approval", {
      headers: { authorization: this.token },
    });
  }
}
