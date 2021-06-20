import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from './../_Services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  constructor(private review:ReviewService,private router: Router) { }

  reviews:any;

  ngOnInit(): void {
    this.review.getAllwaitingReviews().subscribe(
      (res)=>{this.reviews= res['reviews'];},
      (err)=>{console.log(err);}
    );
  }


  delete(id: any){
    let result = confirm("Are you sure?");

    if(result){
      this.review.deleteById(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/review');

    }
    
  }

 
Approved(id:string){

  let result = confirm("Are you sure?");

    if(result){
      this.review.approveReview(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/review');

    }

}



Reject(id:string){
   let result = confirm("Are you sure?");

    if(result){
      this.review.rejectReview(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/review');


    }

}


}
