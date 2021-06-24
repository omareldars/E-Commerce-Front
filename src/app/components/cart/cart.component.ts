import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_Services/cart.service';
import { ProductService } from '../_Services/product.service';


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
  product:any;
  products:any[]=[];
  d:any;
  cartProduct:any;
  currentProductId:any;
  productsArray:any[]=[];
  cartProductstatus:any;

  totalPrice:number = 0;
  subPrice:number = 0;
  tax:number = 0;
  constructor(private router: Router, private myCart: CartService , private myproduct:ProductService) { }

  ngOnInit(): void {

    this.myCart.usercart().subscribe(
      d => {
        this.cart=d['carts'][0]['products'];
        this.cartId=d['carts'][0]['_id'];
        // this.cartProduct= d['carts'][0]['products'][6]['product'];

        console.log("from for cart products =>>>>",this.cart);

        for(let i = 0; i<this.cart.length; i++){
          if(!this.cart[i]){continue;}
          this.cartProduct= this.cart[i]?.['quantity'];
          this.cartProductstatus= this.cart[i]?.['status'];
          
          this.currentProductId=this.cart[i]['product'];

          this.myproduct.getProductById(this.currentProductId).subscribe(
            d=>{
              d.quantity=this.cartProduct;
              this.productsArray.push(d);
            }
          )
          
        }
       

         this.myCart.getCartById(this.id).subscribe(
          (res)=>{
            console.log("res---->",res);
            this.cart = res['cart'];
            console.log("cart---->",this.cart);
            },
          (err)=>{console.log("error--->",err);}
        );
       

      },   
      err=>{console.log('no cart found')} 
    )
 
    
  }

  //   this.myCart.usercart().subscribe(
  //     d => {
  //       this.cart=d['carts'][0]['products'];
  //       this.cartId=d['carts'][0]['_id'];
  //       this.product=d['carts'][0]['products'][6]['product'];
  //        console.log("my cart=>",d);
  //        console.log("this is product ==>",this.product);

  //        this.myCart.getCartById(this.id).subscribe(
  //         (res)=>{
  //           console.log("res---->",res);
  //           this.cart = res['cart'];
  //           console.log("cart---->",this.cart);
  //           },
  //         (err)=>{console.log("error--->",err);}
  //       );
       

  //     },   
  //     err=>{console.log('no cart found')} 
  //   )
 
    
  // }

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

  calcTotalPrice(){
    // total price
    let sub =0;
    for (let i = 0; i < this.cart.length; i++) {
      sub += this.cart[i].price * this.cart[i].quantity ;
      console.log(this.subPrice);
    }
    this.subPrice = sub;
    // console.log(subPrice);
    this.tax = this.subPrice * 0.14;
    this.totalPrice = this.tax + this.subPrice;
    // return this.subPrice, this.tax, this.totalPrice;
  }

  
  increaseQty(item: any): void {
    item.quantity++;
    alert('Product Increased by One');
    console.log("---->item-in-->",item);
    this.calcTotalPrice()
  }
  
  decreaseQty(item:any): void {
    item.quantity--; 
    
    alert('Product Decreased by One');
    if(item.quantity == 0 ) {
      this.cart = this.cart.filter((cartItem: any)=> cartItem._id !== item._id )
    }
    console.log("---->item-de-->",item);
    this.calcTotalPrice()
  }

}
