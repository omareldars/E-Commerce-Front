import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../_Services/cart.service";
import { ProductService } from "../_Services/product.service";
import Swal from "sweetalert2";
import { OrderService } from "../_Services/order.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: any;
  id: any;
  cartId: any;
  product: any;
  products: any;
  d: any;
  cartProduct: any;
  currentProductId: any;
  productsArray = [];
  cartProductstatus: any;

  totalPrice: number = 0;
  subPrice: number = 0;
  tax: number = 0;

  constructor(
    private router: Router,
    private myCart: CartService,
    private myproduct: ProductService,
    private orderservice: OrderService
  ) {}

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData() {
    this.myCart.usercart().subscribe(
      (d) => {
        this.productsArray = [];
        this.cart = d["carts"][0]["products"];
        this.cartId = d["carts"][0]["_id"];
        this.myCart.updatecartData(this.cart.length);
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

  // removeProduct(cartId:any, productId:any){
  //   let result = confirm("Are you sure?");
  //   if(result)
  //   {
  //     this.myCart.removeFromCart(cartId, productId).subscribe(
  //     (res)=>{console.log(res);},
  //     (err)=>{console.log(err);}
  //     );
  //     this.cart = this.cart.filter((products: { productId: any; }) => products.productId != productId);
  //     this.router.url;
  //   }
  // }

  removeProduct(cartId: any, productId: any) {
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
        text: "You won't be able to revert this!",
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
          this.myCart.removeFromCart(cartId, productId).subscribe(
            (res) => {
              // console.log(res);
              this.getCartData();
            },
            (err) => {
              console.log(err);
            }
          );
          this.cart = this.cart.filter(
            (products: { productId: any }) => products.productId != productId
          );
          this.router.url;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Data is safe :)",
            "error"
          );
        }
      });
  }

  emptyCart(id: any) {
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
        text: "You won't be able to revert this!",
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
            "Cart has been deleted.",
            "success"
          );
          this.myCart.deleteById(id).subscribe(
            (res) => {
              // console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
          this.cart = "";
          this.router.url;
          window.location.reload();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Data is safe :)",
            "error"
          );
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

  increaseQty(cartId: any, item: any, indexOfItem): void {
    // item.quantity++;
    this.myCart.increase(cartId, item._id, 1).subscribe(
      (res) => {
        // console.log(res);
        this.productsArray[indexOfItem].quantity++;
      },
      (err) => {
        console.log(err);
      }
    );
    // console.log("---->item-in-->", item);
    this.calcTotalPrice();
  }

  decreaseQty(cartId: any, item: any, indexOfItem): void {
    // item.quantity--;

    this.myCart.decrease(cartId, item._id, 1).subscribe(
      (res) => {
        this.productsArray[indexOfItem].quantity--;
        // debugger;
        // console.log("quantity= ", item.quantity);
        // console.log(res);
        if (item.quantity === 0) {
          this.myCart.removeFromCart(cartId, item._id).subscribe(
            (res2) => {
              // console.log(res2);
              Swal.fire({
                position: "center",
                icon: "warning",
                title: " Removing ...",
                text: "Product will be removed",
                showConfirmButton: false,
                iconColor: "#f8bb86",
                timer: 1500,
              });
              window.location.reload();
            },
            (err2) => {
              // console.log(err2);
            }
          );
        }
        // console.log("---->item-in-->", item);
        this.calcTotalPrice();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 0);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  PlaceOrder(Productarr: any, subPrice: any, tax: any, totalPrice: any) {
    console.log("From PlaceOrder arr--->", Productarr);
    console.log("From PlaceOrder sub--->", subPrice);
    console.log("From PlaceOrder tax--->", tax);
    console.log("From PlaceOrder total--->", totalPrice);
    let ob = [Productarr, subPrice, tax, totalPrice];
    this.orderservice.addData(ob);
    console.log(ob);
    setTimeout(() => {}, 1000);
    window.location.replace("/checkout");
  }
}
