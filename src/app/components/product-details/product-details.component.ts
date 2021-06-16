import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_Models/Product';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styles: [
  ]
})
export class ProductDetailsComponent implements OnInit {
  product:any=null;

  constructor(private myproduct:ProductService,  public ar:  ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct(this.ar.snapshot.paramMap.get('id'));
  }

  getProduct(id:any): void {
    this.myproduct.getProductById(id)
      .subscribe(
        data => {
        this.product= data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
