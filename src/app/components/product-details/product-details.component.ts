
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_Models/Product';
import { ProductService } from '../_Services/product.service';
import { ReviewService } from './../_Services/review.service';
import { Review } from '../_Models/Review';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../_Services/category.service';
import { CartService } from '../_Services/cart.service';
import { WishlistService } from '../_Services/wishlist.service';
import { Wishlist } from '../_Models/Wishlist';
import { Cartitem } from '../_Models/Cartitem';
import { Cart } from '../_Models/Cart';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {
  
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

get title() {
  return this.profileForm.get('title');
}
get rating() {
  return this.profileForm.get('rating');
}
get review() {
  return this.profileForm.get('review');
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
 

  cat:any;
  currentRate:any[] = [0];
  mycart=[];
  ncart:Cart;


  constructor(private myproduct:ProductService,public s:CategoryService,public ar:ActivatedRoute,private mycategory:CategoryService,private myCart:CartService,private myreview:ReviewService,private mywishlist:WishlistService,private router: Router) { }

  ngOnInit(): void {
    this.getProduct(this.ar.snapshot.paramMap.get('id'));
  }

  getProduct(id:any): void {
    this.myproduct.getProductById(id)
      .subscribe(
        data => {
        this.product= data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  rateProduct(Productid){
    this.nreview.rating = this.rating?.value;
    this. nreview.review = this.review?.value;
   
    this.nreview.product=Productid;
  
       this.myreview.add(this.nreview).subscribe(
          d => {
              console.log(d)
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
          console.log(d)
          this.AllProductReviews = d;
        },
        err => this.errors = 'Could not authenticate'
        
        
        
      // console.log(rating,Productid);
      // console.log(this.nreview);
      );
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

  }


