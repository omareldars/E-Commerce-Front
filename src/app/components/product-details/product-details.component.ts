
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
import Swal from 'sweetalert2';
import { environment } from './../../../environments/environment';
import { UserService } from '../_Services/user.service';
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
  currentRate:any = 0;
  mycart=[];
  ncart:Cart;
  userData: any;
  authorized = false;
  constructor(private myproduct:ProductService,public s:CategoryService,public ar:ActivatedRoute,private mycategory:CategoryService,private myCart:CartService,private myreview:ReviewService,private mywishlist:WishlistService,private router: Router, private authServ: UserService) 
  {
    if (!localStorage.getItem("access_token")) {
      this.authorized = false;
    } else {
      this.authorized = true;
      this.getUserData();
    }
  }

  ngOnInit(): void {
    this.getProduct(this.ar.snapshot.paramMap.get('id'));
    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.productss = res;
        // console.log("products--->",JSON.stringify(res))
      },
       (err)=>{console.log(err);}
    );

    this.myreview.getAllApprovedReviews().subscribe(
      (res)=>{this.reviews = res["reviews"]; 
      // console.log("reviews--->",JSON.stringify(this.reviews))
      },
       (err)=>{console.log(err);}
    );
    setTimeout(() => {
      this.calculatePrdouctsReviews();
    },1200);
  }


  getUserData() {
    this.authServ.getUser().subscribe((res) => {
      this.userData = res;
    });
  }


  getProduct(id:any): void {
    this.myproduct.getProductById(id)
      .subscribe(
        data => {
        this.product= data;
          // console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  rateProduct(Productid){
    let loggedIn = localStorage.getItem('access_id');
    if(loggedIn){
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Pending Approval",
        iconColor: "#3fc3ee",
        timer: 1500,
      });
      this.nreview.rating = this.rating?.value;
      this. nreview.review = this.review?.value;
      this.nreview.product=Productid;
      this.myreview.add(this.nreview).subscribe(
        d => {
          console.log(d)
          window.location.reload();
        },
          err => this.errors = 'Could not authenticate'
        );
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          cancelButton: "btn btn-danger",
          confirmButton: "btn btn-success",
        },
        buttonsStyling: true,
      });
      swalWithBootstrapButtons
        .fire({
          position: "center",
          icon: "error",
          title: "Not Accepted",
          text:" You Should LogIn First",
          iconColor: "#f27474",
          showCancelButton: true,
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#d33",
          confirmButtonText: "LogIn",
          cancelButtonText: "Cancel",
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Redirecting",
              "You will be redirected to login page",
              "success"
            );
            // this.router.url;
            window.location.href="/login";
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your review won't be written",
              "error"
            );
          }
        });
  
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title: "Not Accepted",
      //   text:" You Should LogIn First",
      //   iconColor: "#f27474",
      //   timer: 1500,
      // });
      // window.location.href = environment.mainUrl;
    }
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
    let loggedIn = localStorage.getItem('access_id');
    if(loggedIn){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added To Cart",
        iconColor: "#a5dc86",
        timer: 1500,
      });
    
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
             window.location.href="home";
            },
            err => this.errors = 'Could not authenticate');
         }
        // console.log(d[0]);
        // this.router.navigateByUrl('/home')
        window.location.href="/home";
      },
      err => this.errors = 'Could not authenticate'
    );}
    else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You should Login First ",
        iconColor: "#f27474",
        timer: 1500,
      });
    }
  }



  addtoWishlist(Productid){
    let loggedIn = localStorage.getItem('access_id');
    if(loggedIn){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added To Wishlist",
        iconColor: "#a5dc86",
        timer: 1500,
      });
    this.nwishlist.product=Productid;
    this.nwishlist.isLiked=true;
  
    this.mywishlist.addWishlist(this.nwishlist).subscribe(
      d => {
        this.nwishlist.isLiked=true;
        console.log(d)
        // this.router.navigateByUrl('/home')
        window.location.href= "/home";
      },
      err => this.errors = 'Could not authenticate'
    
    // console.log(rating,Productid);
    // console.log(this.nreview);
    );}
    else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You should Login First ",
        iconColor: "#f27474",
        timer: 1500,
      });
    }
   }
   calculatePrdouctsReviews(){
   
      let rating = 0, numOfRaings = 0;
      for(let j=0;j<this.reviews.length;j++){
        if(this.product._id === this.reviews[j].product){
          rating +=  this.reviews[j].rating ; numOfRaings++;
        }
      
      this.currentRate = rating/numOfRaings;
      // console.log('rating => ', rating);
      // console.log('numOfRaings => ', numOfRaings);
      // console.log(this.currentRate[i] => ,  this.currentRate[i]);
      // console.log(this.currentRate);
    }
  }
      
Rate( Productid){
  setTimeout(()=>{
    this.nreview.rating=this.currentRate;
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
            // this.router.navigateByUrl('/home')
            window.location.href="/home";
          },
          err => this.errors = 'Could not authenticate'
          
          
          
        // console.log(rating,Productid);
        // console.log(this.nreview);
        );
        
    },300);
 }
  }


