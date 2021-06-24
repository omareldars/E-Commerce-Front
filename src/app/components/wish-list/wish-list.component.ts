import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';
import { WishlistService } from './../_Services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styles: [
  ]
})
export class WishListComponent implements OnInit {




  wishlistForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
    ]),
    
    price: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ])
    ,
    quantity: new FormControl('', [
      Validators.required,
      Validators.min(1)
    ])
    ,
    photo: new FormControl('', [
      Validators.required,
    ])
    ,
  
    isLiked: new FormControl('', [
      Validators.required,
    ]),
    product: new FormControl('',[
      Validators.required,
    ])
  });


  get title() {
    return this.wishlistForm.get('title');
  }


  get product(){
    let productid:any =  this.wishlistForm.get('product');
    let product_name = this.mproduct.getProductById(productid);
    return product_name
  }
  
  constructor(private wishlist:WishlistService, private mproduct:ProductService, private router: Router) { }
  wishlists:any=[];
  products:any=null;
  id:any;
  // product:any;
  // isLiked:boolean=false



  
  ngOnInit(): void {

    this.mproduct.getProductById(this.id).subscribe(
      (res)=>{
        this.products=(res);
        console.log("______________________________________");
        console.log(res);
        this.wishlistForm = new FormGroup({
          title : new FormControl(this.products.title),
          // price: new FormControl(this.products.price),
          product: new FormControl(this.products.product),
          // photo: new FormControl(this.products.photo),
        });
      },
      (err)=>{console.log(err)}
    );


    this.wishlist.getAllProductsWishlist().subscribe(
      (res)=>{this.wishlists=res['wishlist'];
    //  this.isLiked=true;
    console.log(res)
    },
      (err)=>{console.log(err)}
    );

  //   this.product.getProductById(this.id).subscribe(

  //  (res)=>{this.categories = res['categories']; console.log(this.categories);},
  //     (err)=>{console.log(err);}
  //   );
  //   )
this.getAllProduct()
  }


  getAllProduct(): void {
    this.mproduct.getAllProducts()
      .subscribe(
        data => {
        this.products= data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
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
  UnlikeProduct(id:any){
    let result = confirm("Are you sure?");

    if(result){
      this.wishlist.deleteWishlistById(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.wishlists = this.wishlists.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/wishlist');

    }
  }

}
