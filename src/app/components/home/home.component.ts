import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../_Services/category.service';
import { ProductService } from '../_Services/product.service';
import { CartService } from "../_Services/cart.service";
import { ReviewService } from '../_Services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../_Models/Review';
import { Product } from './../_Models/Product';
import { Cart } from './../_Models/Cart';
import { Cartitem } from './../_Models/Cartitem';
import { WishlistService } from '../_Services/wishlist.service';
import { Wishlist } from '../_Models/Wishlist';
import { AfterViewInit } from '@angular/core';
 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
 

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

  isLiked: new FormControl('', [
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
get isLiked() {
  return this.profileForm.get('isLiked');
}

 cartarr:any[]=[];
nreview: Review = new Review(this.title?.value, this.rating?.value,this.review?.value,this.product?.value);
nwishlist: Wishlist = new Wishlist(this.isLiked?.value,this.product?.value);
nitem: Cartitem = new Cartitem(this.product?.value);
wishlists:any=[];

  // @Input('product') products: Product;
categories:any[];
productss:any[];
reviews:any[];


  constructor(private mycategory:CategoryService,private myproduct:ProductService,private router: Router, private myCart:CartService,private myreview:ReviewService,private mywishlist:WishlistService) { 
    // debugger;
  }


  ngAfterViewInit(): void {
    this.mywishlist.getAllProductsWishlist().subscribe(
      (res)=>{this.wishlists=res['wishlist'];
    //  this.isLiked=true;
    console.log("wishlist--->",JSON.stringify(this.wishlists))
    // console.log(res)
    },
      (err)=>{console.log(err)}
    );

    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];
      console.log("cats--->",JSON.stringify(this.categories))},
      (err)=>{console.log(err);}
    );

    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.productss = res;
        console.log("products--->",JSON.stringify(res))
      },
       (err)=>{console.log(err);}
    );

    this.myreview.getAllApprovedReviews().subscribe(
      (res)=>{this.reviews = res["reviews"]; 
      console.log("reviews--->",JSON.stringify(this.reviews))
      },
       (err)=>{console.log(err);}
    );
    setTimeout(() => {
      this.calculatePrdouctsReviews();
    },1200);
    // throw new Error('Method not implemented.');
  }
 

  ngOnInit(): void {
    if(localStorage.getItem('refresh') === "0" )
    {
      localStorage.setItem('refresh', "1"); 
      setTimeout(()=> {
        window.location.reload();
      },0);
    }
    // debugger;
    // const resultwishlist=this.myproduct.getProductById(id:any){

    // }
    // for(let i=0; i<this.productss.length; i++){
    //   let rating = 0, numOfRaings = 0;
    //   for(let j=0;j<this.reviews.length;j++){
    //     if(this.productss[i]._id === this.reviews[j].product){
    //       rating++; numOfRaings++;
    //     }
    //   }
    //   this.currentRate[i] = rating/numOfRaings;
    // }
    // debugger;
    // this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['home']);
    // });
     
  }

  calculatePrdouctsReviews(){
    for(let i=0; i<this.productss?.length; i++){
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
  mycart=[];
  ncart:Cart;

  addToCart(product: any)
  {
    
    this.myCart.mycart().subscribe(
      data => {
        this.mycart = data["cartID"];
         console.log("from cart",data["cartID"]);
         debugger;
         let exists = this.cartarr.filter(s =>s.product == product._id)
         if(exists.length == 0 ){
          this.cartarr.push(this.nitem);
          this.ncart=new Cart(this.cartarr);
          this.nitem.product=product._id;
         this.myCart.addToCart(data["cartID"], this.ncart).subscribe(
           p => {console.log(p);},
           err => this.errors = 'Error in adding to cart'
         )} else{
          this.myCart.increase(data["cartID"],product._id,1).subscribe(
            dd => {
              console.log(dd)
              this.router.navigateByUrl('/home')
            },
            err => this.errors = 'Could not authenticate');
         }
        // console.log(d[0]);
        this.router.navigateByUrl('/home')
      },
      err => this.errors = 'Could not authenticate'
    );
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


 UnlikeProduct(id:any){
  let result = confirm("Are you sure?");

  if(result){
    this.mywishlist.deleteWishlistById(id).subscribe(
      (res)=>{console.log(res);},
      (err)=>{console.log(err);}
    );
    this.nwishlist = this.wishlists.filter((item: { id: any; }) => item.id != id);
    this.router.navigateByUrl('/home');

  }
}


 addtoWishlist(Productid){
  this.nwishlist.product=Productid;
  this.nwishlist.isLiked=true;

  this.mywishlist.addWishlist(this.nwishlist).subscribe(
    d => {
      this.nwishlist.isLiked=true;
      console.log(d)
      this.router.navigateByUrl('/home')
    },
    err => this.errors = 'Could not authenticate'
  
  // console.log(rating,Productid);
  // console.log(this.nreview);
  );
 }



//  exist(id:any){
//   debugger;
//   let exists = this.mycart.filter(s =>s._id == id)
//   return exists
//  }


}






