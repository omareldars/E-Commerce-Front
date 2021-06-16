import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../_Services/category.service';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private mycategory:CategoryService,private myproduct:ProductService,private router: Router) { }

  // @Input('product') products: Product;
  categories:any[];
  products:any[];
  ngOnInit(): void {
    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];},
      (err)=>{console.log(err);}
    );

    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.products = res;},
      (err)=>{console.log(err);}
      
    );
  }


}
