import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeService, StripeCardComponent } from "ngx-stripe";
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from "@stripe/stripe-js";
import { HttpClient } from "@angular/common/http";
import { User } from "../_Models/User";
import { UserService } from "../_Services/user.service";
import { OrderService } from "../_Services/order.service";
import { CartService } from "../_Services/cart.service";
import { ProductService } from "../_Services/product.service";
import Swal from "sweetalert2";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styles: [],
})
export class CheckOutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  productsArray = [];
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#31325F",
        fontWeight: "300",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: "18px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: "es",
  };

  stripeTest: FormGroup;
  carts: any;
  cart: any;
  cartId: any;
  d: any;
  cartProduct: any;
  currentProductId: any;
  cartProductstatus: any;
  totalPrice: number = 0;
  subPrice: number = 0;
  tax: number = 0;
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient,
    private UserService: UserService,
    private orderservice: OrderService,
    private myCart: CartService,
    private myproduct: ProductService
  ) {
    this.getProductsInCart();
  }

  Euser: User;
  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ["", [Validators.required]],
      // email: ['', [Validators.required]]
    });

    this.UserService.getme().subscribe((d) => {
      // console.log(d);
      this.Euser = d;
    });

    this.carts = this.orderservice.cardDetails$?.value;
    // console.log(" on init carts--->", this.carts);
  }

  getProductsInCart() {
    this.myCart.usercart().subscribe(
      (d) => {
        this.cart = d["carts"][0]["products"];
        this.cartId = d["carts"][0]["_id"];
        // console.log("cartId : ", this.cartId);
        // console.log("cart : ", d["carts"][0]);

        // console.log("my cart=>",d);
        // console.log("cart products=>",this.cart);
        for (let i = 0; i < this.cart.length; i++) {
          if (!this.cart[i]) {
            continue;
          }
          this.cartProduct = this.cart[i]?.["quantity"];
          this.cartProductstatus = this.cart[i]?.["status"];
          this.currentProductId = this.cart[i]["product"];
          this.myproduct
            .getProductById(this.currentProductId)
            .subscribe((d) => {
              // console.log("cart-prouduct-Id-->", this.currentProductId);
              d.quantity = this.cart.filter(
                (s) => s.product == d._id
              )[0].quantity;
              // d.quantity = this.cartProduct;
              this.productsArray.push(d);
              // console.log("productsArray : ", this.productsArray);

              // debugger;
              // const index = this.productsArray.indexOf(d);
              // if(index > -1){
              //   this.productsArray.splice(index,1)
              // }
              this.calcTotalPrice();
              // console.log("product array--->", this.productsArray);
              // debugger;
              // this.productsArray.forEach(element => {
              //   element.qty = this.cart.filter(s=>s.product == element._id)[0].quantity
              // });
            });
        }
        // console.log("product array out for loop--->", this.productsArray);
      },
      (err) => {
        console.log("no cart found");
      }
    );
  }
  createOrder() {
    var orderDetails = {
      cart: this.productsArray,
      subTotal: this.subPrice,
      tax: this.tax,
      totalPrice: this.totalPrice,
      user: localStorage.getItem("access_id"),
      status: "Processing",
      shippingAddress: this.Euser.address,
      city: this.Euser.city,
      country: this.Euser.country,
      phone: this.Euser.phone,
    };
    this.orderservice.createOrder(orderDetails).subscribe((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Order Placed Successufully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = environment.mainUrl;
    });
  }
  emptyCart() {
    this.myCart.deleteById(this.cartId).subscribe((res) => {
      this.myCart.updatecartData([]);
    });
  }
  createToken(): void {
    const name = this.stripeTest.get("name").value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
          this.http
            .post("http://localhost:3000/payme", {
              token: result.token.id,
            })
            .subscribe(
              (res) => {
                // console.log("The response from server is ", res);
                this.createOrder();
                this.emptyCart();
                // console.log("Payment Done");
              },
              (err) => {
                console.log("The error is ", err);
              }
            );
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  calcTotalPrice() {
    // debugger;
    let sub = 0;
    // console.log("from calc--->", this.productsArray.length);
    // console.log("from calc arr--->", this.productsArray);
    for (let i = 0; i < this.productsArray.length; i++) {
      sub += this.productsArray[i].price * this.productsArray[i].quantity;
      // console.log("sub--->", sub);
    }
    this.subPrice = sub;
    // console.log("sub price", this.subPrice);
    this.tax = this.subPrice * 0.14;
    // console.log("sub price", this.tax);
    this.totalPrice = this.tax + this.subPrice;
    // console.log("sub price", this.totalPrice);
  }
}
