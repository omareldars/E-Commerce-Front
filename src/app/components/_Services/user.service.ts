import { HttpClient } from '@angular/common/http';
import { User } from '../_Models/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public token: any = localStorage.getItem('access_token');
  constructor(private http: HttpClient) { }

  login(email: any , password: any) {
    return this.http.post<User>('http://localhost:3000/users/login', { email: email, password: password })
  }
  getUser() {
    return this.http.get<User>('http://localhost:3000/users/me', { headers: { authorization: this.token } })
  }

  EditData(eUser: User) {
    return this.http.put<User>('http://localhost:3000/users/edit/', eUser, { headers: { authorization: this.token } });
  }
  RemoveAc() {
    return this.http.delete<{ msg: string }>('http://localhost:3000/users/remove', { headers: { authorization: this.token } });
  }
  getme() {
    return this.http.get<User>('http://localhost:3000/users/me', { headers: { authorization: this.token } });
  }
  getAllUSers(){
    return this.http.get<User[]>('http://localhost:3000/users/list', { headers: { authorization: this.token } });
  }
  // deleteUser(id: any){
    // return this.http.delete<User[]>('http://localhost:3000/users/delete/'+id, { headers: { authorization: this.token } });
  // }
  deleteById(id: string){
    return this.http.delete<User>("http://localhost:3000/users/delete/"+id, { headers: { authorization: this.token } });
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_id');
  }
// method for check if user logged in or not 
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  register(newUser: User) {
    return this.http.post<User>('http://localhost:3000/users/register', newUser);
  }


















}
