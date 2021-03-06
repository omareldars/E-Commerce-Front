import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Cart } from "../_Models/Cart";
import { Cartitem } from "../_Models/Cartitem";
import { CartService } from "../_Services/cart.service";
import { ProductService } from "../_Services/product.service";
import { WishlistService } from "./../_Services/wishlist.service";

@Component({
  selector: "app-wish-list",
  templateUrl: "./wish-list.component.html",
  styles: [],
})
export class WishListComponent implements OnInit {
  public errors: string = "";
  cartProduct = [];

  wishlistForm = new FormGroup({
    title: new FormControl("", [Validators.required]),

    price: new FormControl("", [Validators.required, Validators.min(1)]),
    quantity: new FormControl("", [Validators.required, Validators.min(1)]),
    photo: new FormControl("", [Validators.required]),
    isLiked: new FormControl("", [Validators.required]),
    product: new FormControl("", [Validators.required]),
  });

  get title() {
    return this.wishlistForm.get("title");
  }
  get product() {
    return this.wishlistForm.get("title");
  }

  // get product(){
  //   let productid:any =  this.wishlistForm.get('product');
  //   let product_name = this.mproduct.getProductById(productid);
  //   return product_name
  // }
  nitem: Cartitem = new Cartitem(this.product?.value);
  constructor(
    private wishlist: WishlistService,
    private mproduct: ProductService,
    private router: Router,
    private myCart: CartService
  ) {}
  wishlists: any = [];
  products: any = null;
  id: any;
  // product:any;
  // isLiked:boolean=false

  cartarr: any[] = [];

  ngOnInit(): void {
    this.getCurrentCart();
    this.mproduct.getProductById(this.id).subscribe(
      (res) => {
        this.products = res;
        // console.log("______________________________________");
        // console.log(res);
        this.wishlistForm = new FormGroup({
          title: new FormControl(this.products.title),
          // price: new FormControl(this.products.price),
          product: new FormControl(this.products.product),
          // photo: new FormControl(this.products.photo),
        });
      },
      (err) => {
        console.log(err);
      }
    );

    this.getWishes();

    //   this.product.getProductById(this.id).subscribe(

    //  (res)=>{this.categories = res['categories']; console.log(this.categories);},
    //     (err)=>{console.log(err);}
    //   );
    //   )
    this.getAllProduct();
  }

  getWishes() {
    this.wishlist.getAllProductsWishlist().subscribe(
      (res) => {
        this.wishlists = res["wishlist"];
        this.wishlist.updatewhishesData(res["wishlist"]);
        for (let i = 0; i < this.wishlists.length; i++) {
          if (this.checkIfExistInCart(this.wishlists[i].product._id)) {
            this.wishlists.splice(i, 1);
            this.UnlikeProduct(this.wishlists[i].product._id);
          }
        }
        //  this.isLiked=true;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAllProduct(): void {
    this.mproduct.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // getProduct(id:any): void {
  //   this.mproduct.getProductById(id)
  //     .subscribe(
  //       data => {
  //       this.products= data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });

  // }
  UnlikeProduct(id: any) {
    console.log("will remove ", id);

    this.wishlist.deleteWishlistById(id).subscribe(
      (res) => {
        // console.log(res);
        this.getWishes();
        // this.wishlist.updatewhishesData(this.wishlists.length - 1);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  mycart;
  ncart: Cart;
  // addToCart(product: any)
  // {
  //   this.cartarr.push(this.nitem);
  //   console.log("cartarr",this.cartarr);
  //   this.ncart=new Cart(this.cartarr);
  //   // this.c.push(this.nitem);
  //   // console.log("cart",this.nitem);
  //   //  this.productss.push(product._id)
  //   console.log("yyyyyyyyyyyyyyyyy",this.wishlists);
  //   console.log("dddddddddddddddddddddddddd",this.wishlist);
  //   this.nitem.product=product["product"]._id;
  //   // console.log("hhhhhhhhhhhh",product);
  //   this.myCart.mycart().subscribe(
  //     d => {
  //       this.mycart = d["cartID"];
  //        console.log("from cart",d["cartID"]);

  //        this.myCart.addToCart(d["cartID"], this.ncart).subscribe(
  //          p => {console.log(p);},
  //          err => this.errors = 'Error in adding to cart'
  //        )
  //       // console.log(d[0]);
  //       this.router.navigateByUrl('/home')
  //     },
  //     err => this.errors = 'Could not authenticate'

  //   );
  //   // console.log("jk",this.mycart);
  //   // console.log(this.mycart.user);
  // }
  getCurrentCart() {
    this.myCart.usercart().subscribe((data) => {
      let cartProducts = data["carts"][0].products;
      this.cartProduct = data["carts"][0].products;
      this.myCart.updatecartData(cartProducts.length);
    });
  }
  checkIfExistInCart(productId) {
    var i;
    for (i = 0; i < this.cartProduct.length; i++) {
      if (this.cartProduct[i]._id === productId) {
        return true;
      }
    }
    return false;
  }
  // addToCart(product: any) {
  //   this.myCart.usercart().subscribe(
  //     (data) => {
  //       this.mycart = data["carts"][0]._id;

  //       // console.log("from cart", data["carts"][0]._id);
  //       //  debugger;
  //       let cartProducts = data["carts"][0].products;
  //       let exists = cartProducts.filter(
  //         (s) => s.product == product["product"]._id
  //       );
  //       this.cartarr = [];
  //       if (exists.length == 0) {
  //         this.cartarr.push(this.nitem);
  //         this.ncart = new Cart(this.cartarr);
  //         this.nitem.product = product["product"]._id;
  //         this.myCart.addToCart(data["carts"][0]._id, this.ncart).subscribe(
  //           (p) => {
  //             // console.log(p);
  //             this.getCurrentCart();
  //           },
  //           (err) => (this.errors = "Error in adding to cart")
  //         );
  //       } else {
  //         this.myCart
  //           .increase(data["carts"][0]._id,, 1)
  //           .subscribe(
  //             (dd) => {
  //               // console.log(dd);
  //               this.getCurrentCart();
  //               // this.router.navigateByUrl("/home");
  //             },
  //             (err) => (this.errors = "Could not authenticate")
  //           );
  //       }
  //       this.getWishes();
  //       // console.log(d[0]);
  //       // this.router.navigateByUrl("/home");
  //     },
  //     (err) => (this.errors = "Could not authenticate")
  //   );
  // }
  
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
        let exists = cartProducts.filter((s) => s.product == product["product"]._id);
        this.cartarr = [];
        if (exists.length == 0) {
          this.cartarr.push(this.nitem);
          this.ncart = new Cart(this.cartarr);
          this.nitem.product = product["product"]._id;
          this.myCart.addToCart(data["carts"][0]._id, this.ncart).subscribe(
            (p) => {
              // console.log(p);
              this.getCurrentCart();
            },
            (err) => (this.errors = "Error in adding to cart")
          );
        } else {
          this.myCart.increase(data["carts"][0]._id, product["product"]._id, 1).subscribe(
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

}
