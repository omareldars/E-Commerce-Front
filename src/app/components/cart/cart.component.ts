import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  cart:any;
  id:any;
  cartId:any;
  constructor(private router: Router, private myCart: CartService) { }

  ngOnInit(): void {
    this.myCart.usercart().subscribe(
      d => {
        this.cart = d['carts'][0]['products'];
        this.cartId = d['carts'][0]['_id'];
        console.log("this is id----->",this.cartId,"\n this is cart ---->",this.cart);
      },
      err => console.log('No Cart Found')
      );
    }
  removeProduct(cartId:any, productId:any){
    let result = confirm("Are you sure?");
    if(result)
    {
      this.myCart.removeFromCart(cartId, productId).subscribe(
      (res)=>{console.log(res);},
      (err)=>{console.log(err);}
      );
      this.cart = this.cart.filter((products: { productId: any; }) => products.productId != productId);
      this.router.url;
    }
  }



  emptyCart(id: any){
    let result = confirm("Are you sure?");
    if(result){
      this.myCart.deleteById(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.cart = '';
      this.router.url;
    }
  }

}
