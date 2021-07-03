
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Cart } from '../_Models/Cart';
// import { CartService } from '../_Services/cart.service';
// import { CategoryService } from '../_Services/category.service';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Cartitem } from '../_Models/Cartitem';
// import { Router } from '@angular/router';
// import { WishlistService } from '../_Services/wishlist.service';
// import { ProductService } from '../_Services/product.service';
// import { Wishlist } from '../_Models/Wishlist';

// @Component({
//   selector: 'app-category-products',
//   templateUrl: './category-products.component.html',
//   styleUrls: ['./category-products.component.css']
// })
// export class CategoryProductsComponent implements OnInit {
//   wishlists:any=[];
//   products:any=null;

//   id:any;
//   public errors: string = "";
//   mycart;
//   ncart:Cart;
//   constructor(public s:CategoryService,public ar:ActivatedRoute,private router: Router,private myCart:CartService,private wishlist:WishlistService,private mproduct:ProductService,private mywishlist:WishlistService){
//   this.id= ar.snapshot.params.id;
//    }

//   categories:any[];
//   cat:any;

//   ngOnInit(): void {
//     this.s.getCategoryProduct(this.id).subscribe(
//       (res)=>{this.categories = res['category'];console.log("this categories",this.categories)},
//       (err)=>{console.log(err);}
//     );

//     this.s.getCategoryById(this.id).subscribe(
//       (res)=>{this.cat = res['category'];console.log("this cat",this.cat)},
//       (err)=>{console.log(err);}
//     );
//   }
  
  




// }

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../_Models/Cart';
import { Cartitem } from '../_Models/Cartitem';
import { Review } from '../_Models/Review';
import { Wishlist } from '../_Models/Wishlist';
import { CartService } from '../_Services/cart.service';
import { CategoryService } from '../_Services/category.service';
import { ProductService } from '../_Services/product.service';
import { ReviewService } from '../_Services/review.service';
import { WishlistService } from '../_Services/wishlist.service';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

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
  id:any;
  constructor(public s:CategoryService,public ar:ActivatedRoute,private mycategory:CategoryService,private myproduct:ProductService,private router: Router, private myCart:CartService,private myreview:ReviewService,private mywishlist:WishlistService) {
    this.id= ar.snapshot.params.id;
  }

  cat:any;
  currentRate:any[] = [0];
  mycart=[];
  ncart:Cart;

  ngOnInit(): void {
    this.s.getCategoryProduct(this.id).subscribe(
      (res)=>{this.categories = res['category'];console.log("this categories",this.categories)},
      (err)=>{console.log(err);}
    );

    this.s.getCategoryById(this.id).subscribe(
      (res)=>{this.cat = res['category'];console.log("this cat",this.cat)},
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
 

  
  addToCart(product: any)
  {
    
    this.myCart.usercart().subscribe(
      data => {
        this.mycart = data["carts"][0]._id;
         console.log("from cart",data["carts"][0]._id);
        //  debugger;
        let cartProducts = data["carts"][0].products;
         let exists = cartProducts.filter(s => s.product == product._id)
         this.cartarr = [];
         if(exists.length == 0 ){
          this.cartarr.push(this.nitem);
          this.ncart=new Cart(this.cartarr);
          this.nitem.product=product._id;
         this.myCart.addToCart( data["carts"][0]._id, this.ncart).subscribe(
           p => {console.log(p);},
           err => this.errors = 'Error in adding to cart'
         )} else{
          this.myCart.increase(data["carts"][0]._id,product._id,1).subscribe(
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
 calculatePrdouctsReviews(){
  for(let i=0; i<this.productss?.length; i++){
    let rating = 0, numOfRaings = 0;
    for(let j=0;j<this.reviews.length;j++){
      if(this.productss[i]._id === this.reviews[j].product){
        rating +=  this.reviews[j].rating ; numOfRaings++;
      }
    }
    this.currentRate[i] = rating/numOfRaings;
   
  }
}



}



