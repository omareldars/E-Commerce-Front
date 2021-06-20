import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../_Services/category.service';
import { ProductService } from '../_Services/product.service';
import {CartService} from "../_Services/cart.service";
import { ReviewService } from '../_Services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../_Models/Review';
import { Product } from './../_Models/Product';
  
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
 


public errors: string = "";

// index = 0;
//   starCount = 5;
//   ratingArr: boolean[] = []; // true = solid star; false = empty star

//   snackBarDuration = 1000;
//   response = [
//     'You broke my heart!',
//     'Really?',
//     'We will do better next time.',
//     'Glad you like it!',
//     'Thank you so much!'
//   ]
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
get title() {
  return this.profileForm.get('title');
}
get rating() {
  return this.profileForm.get('rating');
}
get review() {
  return this.profileForm.get('review');
}
get product() {
  return this.profileForm.get('product');
}

  constructor(private mycategory:CategoryService,private myproduct:ProductService,private router: Router, private myCart:CartService,private myreview:ReviewService, private snackBar: MatSnackBar) { }
  nreview: Review = new Review(this.title?.value, this.rating?.value,this.review?.value,this.product?.value);
  // @Input('product') products: Product;
  categories:any[];
  products:any[];
  ngOnInit(): void {
    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];},
      (err)=>{console.log(err);}
    );

    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.products = res;},
      (err)=>{console.log(err);}

    );
  }

  addToCart(product: any)
  {

  }
  // returnStar(i: number) {
  //       if (this.index >= i + 1) {
  //         return 'star';
  //       } else {
  //         return 'star_border';
  //       }
  //     }
    
   
    
Rate(rating:number,Productid,i:number){
  this.nreview.rating=rating;
  this.nreview.product=Productid;
  // this.index = i + 1;
  //     this.snackBar.open(this.response[i], '', {
  //       duration: this.snackBarDuration,
  //       panelClass: ['snack-bar']
  //     });
   this.myreview.add(this.nreview).subscribe(
    d => {
      console.log(d)
      this.router.navigateByUrl('/home')
    },
    err => this.errors = 'Could not authenticate'
  
  // console.log(rating,Productid);
  // console.log(this.nreview);
  );
 }


}






