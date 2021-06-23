import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Review} from "../_Models/Review";

@Injectable({
    providedIn: 'root'
  })
  export class ReviewService {
  
    baseUrl = "http://localhost:3000/review";

    public token: any = localStorage.getItem('access_token');
    constructor(private http: HttpClient) { }
    
    add(nreview: Review) {
      return this.http.post<Review>('http://localhost:3000/review/add', nreview, { headers: { authorization: this.token } });
  
    }
    getReviewById(id: string){
        return this.http.get<Review>(this.baseUrl+"/"+id, { headers: { authorization: this.token } })
      }
    
    getAllwaitingReviews() {            
    return this.http.get<Review[]>(this.baseUrl+"/allreviews",{} );
  }
  deleteById(id: string){
       return this.http.delete<Review>(this.baseUrl+"/delete/"+id,{ headers: { authorization: this.token } });
     }
     
approveReview(reviewId:string){
    return this.http.put<Review>(this.baseUrl+"/approve/"+reviewId,{},{ headers: { authorization: this.token } });
  }
  
  rejectReview(reviewId:string){
    return this.http.put<Review>(this.baseUrl+"/reject/"+reviewId,{},{ headers: { authorization: this.token } });
  }
  editReview(id: string,review: any){
    return this.http.put<Review>(this.baseUrl+"/"+id,review,{ headers: { authorization: this.token } });
  }
  }
  
