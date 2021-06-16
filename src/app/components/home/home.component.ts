import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../_Services/category.service';
import {ProductService} from "../_Services/product.service";
import { Product } from "../_Models/Product"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private mycategory:CategoryService,private router: Router, private myproduct:ProductService) { }

  // @Input('product') products: Product;
  categories:any[];
  products:any[];
  ngOnInit(): void {
    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];},
      (err)=>{console.log(err);}
    );
    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.products = res['products'];},
        (err)=>{console.log(err);}
    );
  }


}
