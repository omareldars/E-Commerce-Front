import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_Models/Contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public token: any = localStorage.getItem('access_token');
  constructor(private http: HttpClient) { }
  
  add(ncontact: Contact) {
    return this.http.post<Contact>('http://localhost:3000/contact/add', ncontact, { headers: { authorization: this.token } });

  }
}
