import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-admin-dashboard-product',
  templateUrl: './admin-dashboard-product.component.html',
  styleUrls: ['./admin-dashboard-product.component.css']
})
export class AdminDashboardProductComponent implements OnInit {

  constructor(private myproduct:ProductService,private router: Router) { }

  products:any[];

  ngOnInit(): void {
    this.myproduct.getAllProducts().subscribe(
      (res)=>{this.products = res;},
      (err)=>{console.log(err);}
      
    );
  }


  delete(id: any){
    let result = confirm("Are you sure?");

    if(result){
      this.myproduct.deleteById(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.products = this.products.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/admin-product');

    }
    
  }

}
