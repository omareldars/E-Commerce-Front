import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../_Services/category.service';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
  id;
  constructor(public s:CategoryService,public ar:ActivatedRoute) {
    this.id= ar.snapshot.params.id;
  }
  categories:any[];
  cat:any;

  ngOnInit(): void {
    this.s.getCategoryProduct(this.id).subscribe(
      (res)=>{this.categories = res['category'];console.log(this.categories)},
      (err)=>{console.log(err);}
    );

    this.s.getCategoryById(this.id).subscribe(
      (res)=>{this.cat = res['category'];console.log(this.cat)},
      (err)=>{console.log(err);}
    );
  }
  addToCart(product:any){

  }
  addtoWishlist(id:any){

  }
  Rate(rating:number,Productid){

  }

}


