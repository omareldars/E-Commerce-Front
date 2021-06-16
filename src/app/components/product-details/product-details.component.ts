import { Component, OnInit } from '@angular/core';
import { Product } from '../_Models/Product';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {
  pro:any[];

  constructor(private myproduct:ProductService) { }

  ngOnInit(): void {
    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.pro = res['products'];},
      (err)=>{console.log(err);}
    );
  }

}
