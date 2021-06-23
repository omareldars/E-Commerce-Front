import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../_Services/category.service';
import { ProductService } from '../_Services/product.service';
import {CartService} from "../_Services/cart.service";
import { ReviewService } from '../_Services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../_Models/Review';
import { Product } from './../_Models/Product';
import { Cart } from './../_Models/Cart';
import { Cartitem } from './../_Models/Cartitem';
 

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

 cartarr:any[]=[];
  constructor(private mycategory:CategoryService,private myproduct:ProductService,private router: Router, private myCart:CartService,private myreview:ReviewService) { }
  nreview: Review = new Review(this.title?.value, this.rating?.value,this.review?.value,this.product?.value);
  nitem: Cartitem = new Cartitem(this.product?.value)
 

  // @Input('product') products: Product;
  categories:any[];
  productss:any[];
  reviews:any[];
  ngOnInit(): void {
    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];},
      (err)=>{console.log(err);}
    );

    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.productss = res;
      },
       (err)=>{console.log(err);}
    );
    this.myreview.getAllwaitingReviews().subscribe(
      (res)=>{this.reviews = res["reviews"]; 
     
      },
       (err)=>{console.log(err);}
    );
    setTimeout(() => {
      this.calculatePrdouctsReviews();
    },1200);

    // for(let i=0; i<this.productss.length; i++){
    //   let rating = 0, numOfRaings = 0;
    //   for(let j=0;j<this.reviews.length;j++){
    //     if(this.productss[i]._id === this.reviews[j].product){
    //       rating++; numOfRaings++;
    //     }
    //   }
    //   this.currentRate[i] = rating/numOfRaings;
    // }
  }

  calculatePrdouctsReviews(){
    for(let i=0; i<this.productss.length; i++){
      let rating = 0, numOfRaings = 0;
      for(let j=0;j<this.reviews.length;j++){
        if(this.productss[i]._id === this.reviews[j].product){
          rating +=  this.reviews[j].rating ; numOfRaings++;
        }
      }
      this.currentRate[i] = rating/numOfRaings;
      console.log('rating => ', rating);
      console.log('numOfRaings => ', numOfRaings);
      console.log(`this.currentRate[i] => `,  this.currentRate[i]);
      console.log(this.currentRate);
    }
  }
  currentRate:any[] = [0];
  mycart;
  ncart:Cart;
  addToCart(product: any)
  {
    this.cartarr.push(this.nitem);
    console.log("cartarr",this.cartarr);
  this.ncart=new Cart(this.cartarr);
    // this.c.push(this.nitem);
    // console.log("cart",this.nitem);
    //  this.productss.push(product._id)
    this.nitem.product=product._id;
    console.log("hhhhhhhhhhhh",product._id);
    this.myCart.mycart().subscribe(
      d => {
        this.mycart = d["cartID"];
         console.log("from cart",d["cartID"]);
         
         this.myCart.addToCart(d["cartID"], this.ncart).subscribe(
           p => {console.log(p);},
           err => this.errors = 'Error in adding to cart'
         )
        // console.log(d[0]);
        this.router.navigateByUrl('/home')
      },
      err => this.errors = 'Could not authenticate'
    
    );
    // console.log("jk",this.mycart);
    // console.log(this.mycart.user);
  }
 
   
    
Rate(index:number,  Productid){
  setTimeout(()=>{

    this.nreview.rating=this.currentRate[index];
    this.nreview.product=Productid;
  // this.index = i + 1;
  //     this.snackBar.open(this.response[i], '', {
    //       duration: this.snackBarDuration,
    //       panelClass: ['snack-bar']
    //     });
    // this.currentRate[index] = rating;
    console.log(this.currentRate);
     this.myreview.add(this.nreview).subscribe(
        d => {
            console.log(d)
            this.router.navigateByUrl('/home')
          },
          err => this.errors = 'Could not authenticate'
          
          
          
        // console.log(rating,Productid);
        // console.log(this.nreview);
        );
        
    },300);
 }


}






