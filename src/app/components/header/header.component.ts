import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_Services/cart.service';
import { UserService } from '../_Services/user.service';
import { WishlistService } from '../_Services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  search!:string ;
  constructor(public u: UserService,private router:Router, private myCart: CartService, private myWishlist: WishlistService) { }
  
  logout(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    })
    this.u.logout();
  }

  done(){
    console.log("This is search"+this.search)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/search/'+this.search)
    });
  }

  roleuser; 
  errors;
  usercart:any[]=[];
  wishlistarr;
  ngOnInit(): void {
    this.u.getme().subscribe(
      (res)=>{this.roleuser = res;
      },
      (err)=>{console.log("Not Logged In");}
    );

    this.myCart.usercart().subscribe(
      d => {
        let uc = d['carts'][0]['products'];
        if(uc.isUndefined)
        {
          this.usercart = [];
        }
        else{
          this.usercart = uc;
        }
        console.log("usercart-->",this.usercart);
      },
      err => this.errors = 'Could not authenticate'
    );
    // this.myWishlist.

  }

}
