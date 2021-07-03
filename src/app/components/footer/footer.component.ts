
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_Models/Product';
import { ProductService } from '../_Services/product.service';
import { ReviewService } from './../_Services/review.service';
import { Review } from '../_Models/Review';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  product:any=null;
  modalRate;
  modalReview;
  
  
public errors: string = "";

profileForm = new FormGroup({
  title: new FormControl('', [
    Validators.required,
  ]),
  rating: new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]),
  review: new FormControl('', [
    Validators.required,
  ]),
});
  router: any;
get title() {
  return this.profileForm.get('title');
}
get rating() {
  return this.profileForm.get('rating');
}
get review() {
  return this.profileForm.get('review');
}
// get product() {
//   return this.profileForm.get('product');
// }
nreview: Review = new Review(this.title?.value, this.rating?.value,this.review?.value,this.product?.value);
  constructor(private myproduct:ProductService,private myreview:ReviewService,  public ar:  ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct(this.ar.snapshot.paramMap.get('id'));
    
  }

  getProduct(id:any): void {
    this.myproduct.getProductById(id)
      .subscribe(
        data => {
        this.product= data;
          // console.log("from data ",data);
        },
        error => {
          // console.log("ok ok ok");
        });
  }

  rateProduct(Productid){
    this.nreview.rating = this.rating?.value;
    this. nreview.review = this.review?.value;
   
    this.nreview.product=Productid;
  
       this.myreview.add(this.nreview).subscribe(
          d => {
              // console.log(d)
              // this.router.navigateByUrl('/home')
            },
            err => this.errors = 'Could not authenticate'
            
            
            
          // console.log(rating,Productid);
          // console.log(this.nreview);
          );
   }
   AllProductReviews:any=[];
   getAllReviews(productId){
     console.log(productId);
    this.myreview.getProductReviews(productId).subscribe(
      d => {
          // console.log(d)
          this.AllProductReviews = d;
        },
        err => this.errors = 'Could not authenticate'
        
        
        
      // console.log(rating,Productid);
      // console.log(this.nreview);
      );
   }

  }


