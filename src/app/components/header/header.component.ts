import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../_Services/cart.service";
import { UserService } from "../_Services/user.service";
import { WishlistService } from "../_Services/wishlist.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  search!: string;
  countWhishes = 0;
  constructor(
    public u: UserService,
    private router: Router,
    private myCart: CartService,
    private myWishlist: WishlistService
  ) {
    if (localStorage.getItem("access_id")) {
      this.CountWishes();
      this.getCartData();
    }
  }

  logout() {
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {});
    this.u.logout();
    window.location.replace("/home");
  }

  done() {
    console.log("This is search" + this.search);
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl("/search/" + this.search);
    });
  }

  roleuser;
  errors;
  usercart: any[] = [];
  wishlistarr;
  cartCounter = 0;
  ngOnInit(): void {
    this.u.getme().subscribe(
      (res) => {
        this.roleuser = res;
      },
      (err) => {
        // console.log("Not Logged In");
      }
    );

    this.myCart.usercart().subscribe(
      (d) => {
        if (d["carts"] && d["carts"][0]) {
          let uc = d["carts"][0]["products"];
          if (uc.isUndefined) {
            this.usercart = [];
          } else {
            this.usercart = uc;
          }
        }

        // console.log("usercart-->", this.usercart);
      },
      (err) => (this.errors = "Could not authenticate")
    );
    // this.myWishlist.
  }

  getCurrentWhishes() {
    this.myWishlist.getAllProductsWishlist().subscribe(
      (res) => {
        this.myWishlist.updatewhishesData(res["wishlist"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  CountWishes() {
    this.myWishlist.getwhishesData().subscribe((res) => {
      if (res == null) {
        this.getCurrentWhishes();
      } else {
        this.countWhishes = res.length;
      }
    });
  }
  getCurrentCart() {
    this.myCart.usercart().subscribe((data) => {
      let cartProducts = data["carts"][0]?.products;
      // console.log("cartProducts : ", cartProducts);
      if (cartProducts) this.myCart.updatecartData(cartProducts.length);
    });
  }
  getCartData() {
    this.myCart.getcartData().subscribe((res) => {
      if (res == null) {
        this.getCurrentCart();
      } else {
        this.cartCounter = res;
        console.log("res : ", res);
      }
    });
  }
}
