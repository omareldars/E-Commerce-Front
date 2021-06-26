import { Component, OnInit, OnChanges } from '@angular/core';
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
  products:any;
  d:any;
  cartProduct:any;
  currentProductId:any;
  productsArray:any[]=[];
  cartProductstatus:any;

  totalPrice:number = 0;
  subPrice:number = 0;
  tax:number = 0;


  constructor(private router: Router, private myCart: CartService, private myproduct: ProductService) { }

  ngOnInit(): void {
    this.myCart.usercart().subscribe(
      d => {
        this.cart = d['carts'][0]['products'];
        this.cartId = d['carts'][0]['_id'];
        console.log("my cart=>",d);
        console.log("cart products=>",this.cart);

        for(let i = 0; i < this.cart.length; i++ )
        {
          if(!this.cart[i]) 
            {continue;}
            this.cartProduct = this.cart[i]?.['quantity'];
            this.cartProductstatus = this.cart[i]?.['status'];
            this.currentProductId = this.cart[i]['product'];
            this.myproduct.getProductById(this.currentProductId).subscribe(
              d=>{
                d.quantity = this.cart.filter(s=>s.product == d._id)[0].quantity
                // d.quantity = this.cartProduct;
                this.productsArray.push(d);

                debugger;
                const index = this.productsArray.indexOf(d);
                if(index > -1){
                  this.productsArray.splice(index,1)
                }
                this.calcTotalPrice();
                console.log("product array--->",this.productsArray);
                // debugger;
                // this.productsArray.forEach(element => {
                //   element.qty = this.cart.filter(s=>s.product == element._id)[0].quantity
                // });
              }
            )
        }

        console.log("product array out for loop--->",this.productsArray);

        
      }, 
      err=>{console.log('no cart found')}
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

  calcTotalPrice(){
    // debugger;
    let sub = 0;
    console.log("from calc--->",  this.productsArray.length);
    console.log("from calc arr--->",  this.productsArray);
    for(let i = 0 ; i < this.productsArray.length; i++)
    {
      sub +=  this.productsArray[i].price * this.productsArray[i].quantity;
      console.log("sub--->",sub);
    }
    this.subPrice = sub;
    console.log("sub price", this.subPrice);
    this.tax = this.subPrice * 0.14;
    console.log("sub price", this.tax);
    this.totalPrice = this.tax + this.subPrice;
    console.log("sub price", this.totalPrice);
  }

  increaseQty(cartId:any, item:any) : void {
    // item.quantity++;
    this.myCart.increase(cartId, item._id, 1).subscribe(
      (res)=>{console.log(res);},
      (err)=>{console.log(err);}
    );
    alert('Product Increased by One');
    console.log("---->item-in-->", item);
    this.calcTotalPrice()
  }

  decreaseQty(cartId:any,item:any): void{
    // item.quantity--;
    this.myCart.decrease(cartId, item._id, 1).subscribe(
      (res)=>{
        debugger;
        console.log(res);
        alert('Product Decreased by One');
        if(item.quantity === 0){
          this.myCart.removeFromCart(cartId, item._id).subscribe(
            (res2)=>{console.log(res2); alert('Product Was Removed From Cart');},
            (err2)=>{console.log(err2);}
          );
        }
        console.log("---->item-in-->", item);
        this.calcTotalPrice();
        setTimeout(()=> {
          window.location.reload();
        },0);
      },
      (err)=>{console.log(err);}
    );
    
    
  }

}
