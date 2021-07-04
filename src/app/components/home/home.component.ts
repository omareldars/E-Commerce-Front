import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryService } from "../_Services/category.service";
import { ProductService } from "../_Services/product.service";
import { CartService } from "../_Services/cart.service";
import { ReviewService } from "../_Services/review.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Review } from "../_Models/Review";
import { Product } from "./../_Models/Product";
import { Cart } from "./../_Models/Cart";
import { Cartitem } from "./../_Models/Cartitem";
import { WishlistService } from "../_Services/wishlist.service";
import { Wishlist } from "../_Models/Wishlist";
import { AfterViewInit } from "@angular/core";
import Swal from "sweetalert2";
import { UserService } from "../_Services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent implements OnInit, AfterViewInit {
  countrate={};
  public errors: string = "";
  userData: any;
  cartProduct = [];
  getAllProduectsByCategoryId = [];
  profileForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    rating: new FormControl("", [Validators.required, Validators.minLength(1)]),
    review: new FormControl("", [Validators.required]),

    isLiked: new FormControl("", [Validators.required]),
  });
  get title() {
    return this.profileForm.get("title");
  }
  get rating() {
    return this.profileForm.get("rating");
  }
  get review() {
    return this.profileForm.get("review");
  }
  get product() {
    return this.profileForm.get("product");
  }
  get isLiked() {
    return this.profileForm.get("isLiked");
  }

  cartarr: any[] = [];
  authorized = false;
  nreview: Review = new Review(
    this.title?.value,
    this.rating?.value,
    this.review?.value,
    this.product?.value
  );
  nwishlist: Wishlist = new Wishlist(this.isLiked?.value, this.product?.value);
  nitem: Cartitem = new Cartitem(this.product?.value);
  wishlists: any;

  // @Input('product') products: Product;
  categories: any[];
  productss: any[];
  reviews: any[];

  constructor(
    private mycategory: CategoryService,
    private myproduct: ProductService,
    private router: Router,
    private myCart: CartService,
    private myreview: ReviewService,
    private mywishlist: WishlistService,
    private authServ: UserService
  ) {
    // debugger;
    if (!localStorage.getItem("access_token")) {
      this.authorized = false;
      this.wishlists = [];
    } else {
      this.authorized = true;
      this.getUserData();
    }
  }

  ngAfterViewInit(): void {
    this.mywishlist.getAllProductsWishlist().subscribe(
      (res) => {
        this.wishlists = res["wishlist"];
        this.mywishlist.updatewhishesData(res["wishlist"]);
      },
      (err) => {
        // console.log();
      }
    );

  this.getAllCategories();

    this.myreview.getAllApprovedReviews().subscribe(
      (res) => {
        this.reviews = res["reviews"];
        // console.log("reviews--->", JSON.stringify(this.reviews));
      },
      (err) => {
        console.log(err);
      }
    );
    setTimeout(() => {
      this.calculatePrdouctsReviews();
    }, 1200);
    // throw new Error('Method not implemented.');
  }
  getUserData() {
    this.authServ.getUser().subscribe((res) => {
      this.userData = res;
    });
  }
  getRateOfProductById(productId) {
    let rating = 0,
      numOfRaings = 0;
    for (let j = 0; j < this.reviews.length; j++) {
      if (productId == this.reviews[j].product) {
        rating += this.reviews[j].rating;
        numOfRaings++;
      }
    }
    var rateValue = rating / numOfRaings;
    this.countrate["product"+productId]=rateValue?rateValue:0;
    // console.log("countrate : ",this.countrate)
    // return rateValue;
  }
  getAllCategories() {
    this.mycategory.getAllCategories().subscribe(
      (res) => {
        this.getAllProduectsByCategoryId = [];
        this.productss = [];
        this.categories = res["categories"];
        for (let i = 0; i < this.categories.length; i++) {
          this.getAllProduectsByCategoryIId(this.categories[i]._id);
        }
        // console.log("cats--->", JSON.stringify(this.categories));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // getAllProducts() {
  //   this.myproduct.getAllProducts().subscribe(
  //     (res) => {
  //       this.productss = res;
  //       // console.log("products--->", res);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  getAllProduectsByCategoryIId(categoryId) {
    this.mycategory.getCategoryProduct(categoryId).subscribe(
      (res) => {
        this.getAllProduectsByCategoryId.push(res["category"]);
        for (let i = 0; i < res["category"].length; i++) {
          this.productss.push(res["category"][i]);
          this.getRateOfProductById(res["category"][i]._id);
        }
        // console.log("productss : ", this.productss);

        // console.log("cats--->", JSON.stringify(this.categories));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit(): void {
    if (localStorage.getItem("refresh") === "0") {
      localStorage.setItem("refresh", "1");
      setTimeout(() => {
        window.location.reload();
      }, 0);
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

  checkIfExistInWhis(productId) {
    var i;
    for (i = 0; i < this.wishlists.length; i++) {
      if (this.wishlists[i].product?._id === productId) {
        return true;
      }
    }
    return false;
  }

  calculatePrdouctsReviews() {
    for (let i = 0; i < this.productss?.length; i++) {
      let rating = 0,
        numOfRaings = 0;
      for (let j = 0; j < this.reviews.length; j++) {
        if (this.productss[i]._id === this.reviews[j].product) {
          rating += this.reviews[j].rating;
          numOfRaings++;
        }
      }
      this.currentRate = rating / numOfRaings;
      // console.log('rating => ', rating);
      // console.log('numOfRaings => ', numOfRaings);
      // console.log(this.currentRate[i] => ,  this.currentRate[i]);
      // console.log(this.currentRate);
    }
  }
  currentRate = 0;
  mycart = [];
  ncart: Cart;

  getCurrentCart() {
    this.myCart.usercart().subscribe(
      (data) => {
        let cartProducts = data["carts"][0].products;
        this.cartProduct = data["carts"][0].products;
        this.myCart.updatecartData(cartProducts.length);
      },
      (err) => {}
    );
  }

  addToCart(product: any) {
    let loggedIn = localStorage.getItem('access_id');
    if(loggedIn){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added To Cart",
        iconColor: "#a5dc86",
        timer: 1500,
      });
    console.log("product : ", product);

    this.myCart.usercart().subscribe(
      (data) => {
        this.mycart = data["carts"][0]?._id;

        // console.log("from cart", data["carts"][0]._id);
        //  debugger;
        let cartProducts =
          data["carts"].length != 0 ? data["carts"][0]?.products : [];
        let exists = cartProducts.filter((s) => s.product == product._id);
        this.cartarr = [];
        if (exists.length == 0) {
          this.cartarr.push(this.nitem);
          this.ncart = new Cart(this.cartarr);
          this.nitem.product = product._id;
          this.myCart.addToCart(data["carts"][0]._id, this.ncart).subscribe(
            (p) => {
              // console.log(p);
              this.getCurrentCart();
            },
            (err) => (this.errors = "Error in adding to cart")
          );
        } else {
          this.myCart.increase(data["carts"][0]._id, product._id, 1).subscribe(
            (dd) => {
              // console.log(dd);
              this.getCurrentCart();
              // this.router.navigateByUrl("/home");
            },
            (err) => (this.errors = "Could not authenticate")
          );
        }
        // console.log(d[0]);
        // this.router.navigateByUrl("/home");
      },
      (err) => (this.errors = "Could not authenticate")
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

  Rate(e,Productid) {
    setTimeout(() => {
      console.log("events :  ",e);
      // console.log("product  :  ",Productid);
      this.nreview.rating = this.countrate['product'+Productid];
      // console.log("currrate  :  ",this.nreview.rating);
      this.nreview.product = Productid;
      // this.index = i + 1;
      //     this.snackBar.open(this.response[i], '', {
      //       duration: this.snackBarDuration,
      //       panelClass: ['snack-bar']
      //     });
      // this.currentRate[index] = rating;
      // console.log(this.currentRate);
      this.myreview.add(this.nreview).subscribe(
        (d) => {
          console.log(d);
          console.log("nreview : ",this.nreview);

          // this.router.navigateByUrl("/home");
          // window.location.href = "/home";
        },
        (err) => (this.errors = "Could not authenticate")

        // console.log(rating,Productid);
        // console.log(this.nreview);
      );
    }, 300);
  }


  /////////////////////////////
  UnlikeProduct(id: any, categoryId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-danger",
        confirmButton: "btn btn-success",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't  to remove product from wishlist!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Product has been removed",
            "success"
          );
          this.mywishlist.deleteWishlistById(id).subscribe(
            (res) => {
              // console.log(res);
              this.getallWishes();
              this.getAllProduectsByCategoryIId(categoryId);
            },
            (err) => {
              console.log(err);
            }
          );
          this.nwishlist = this.wishlists.filter(
            (item: { id: any }) => item.id != id
          );
          // this.router.navigateByUrl("/home");
          window.location.href = "/home";
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Product in Wishlist :)",
            "error"
          );
        }
      });
  }
  ////////////////////////////////////

  // UnlikeProduct(id: any, categoryId) {
  //   let result = confirm("Are you sure?");

  //   if (result) {
  //     this.mywishlist.deleteWishlistById(id).subscribe(
  //       (res) => {
  //         // console.log(res);
  //         this.getallWishes();
  //         this.getAllProduectsByCategoryIId(categoryId);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //     this.nwishlist = this.wishlists.filter(
  //       (item: { id: any }) => item.id != id
  //     );
  //     // this.router.navigateByUrl("/home");
  //     window.location.href = "/home";
  //   }
  // }

  getallWishes() {
    this.mywishlist.getAllProductsWishlist().subscribe((res) => {
      this.wishlists = res["wishlist"];
      this.mywishlist.updatewhishesData(res["wishlist"]);
    });
  }
  addtoWishlist(Productid, categoryId) {
    let loggedIn = localStorage.getItem('access_id');
    if(loggedIn){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added To Wishlist",
        iconColor: "#a5dc86",
        timer: 1500,
      });
    this.nwishlist.product = Productid;
    this.nwishlist.isLiked = true;

    this.mywishlist.addWishlist(this.nwishlist).subscribe(
      (d) => {
        this.nwishlist.isLiked = true;
        // console.log(d);
        this.getallWishes();
        this.getAllProduectsByCategoryIId(categoryId);
        // this.router.navigateByUrl('/home')
      },
      (err) => (this.errors = "Could not authenticate")

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

  //  exist(id:any){
  //   debugger;
  //   let exists = this.mycart.filter(s =>s._id == id)
  //   return exists
  //  }
}
