import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from './../_Services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styles: [
  ]
})
export class WishListComponent implements OnInit {

  constructor(private wishlist:WishlistService,private router: Router) { }
  wishlists:any;
  ngOnInit(): void {
    this.wishlist.getAllProductsWishlist().subscribe(
      (res)=>{this.wishlists=res['wishlists'];},
      (err)=>{console.log(err)}
    )
  }

  // UnlikeProduct(id:any){
  //   let result = confirm("Are you sure?");

  //   if(result){
  //     this.wishlist.deleteWishlistById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.wishlists = this.wishlists.filter((item: { id: any; }) => item.id != id);
  //     this.router.navigateByUrl('/wishlist');

  //   }
  // }

}
