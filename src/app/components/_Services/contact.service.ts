import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../_Models/Contact";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ContactService {
  baseurl = environment.backendbaseUrl;
  public token: any = localStorage.getItem("access_token");
  constructor(private http: HttpClient) {}

  add(ncontact: Contact) {
    return this.http.post<Contact>(`${this.baseurl}contact/add`, ncontact);
  }
}
