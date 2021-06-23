import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../_Services/cart.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  search!:string ;
  constructor(public u: UserService,private router:Router, private myCart: CartService) { }
  
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
  cartarr;

  ngOnInit(): void {
      this.u.getme().subscribe(
        (res)=>{this.roleuser = res;
      },
        (err)=>{console.log("Not Logged In");}
    );

    this.myCart.usercart().subscribe(
      d => {
        this.cartarr = d['carts'][0]['products'];
      },
      err => this.errors = 'Could not authenticate');
  }

}
