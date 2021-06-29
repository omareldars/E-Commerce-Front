import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';
import Swal from 'sweetalert2';

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


  // delete(id: any){
  //   let result = confirm("Are you sure?");

  //   if(result){
  //     this.myproduct.deleteById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.products = this.products.filter((item: { id: any; }) => item.id != id);
  //     this.router.navigateByUrl('/admin-product');

  //   }
    
  // }



  sweetalert(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-success'
        
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',


    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.myproduct.deleteById(id).subscribe(
          (res)=>{console.log(res);},
          (err)=>{console.log(err);}
        );
        this.products = this.products.filter((item: { id: any; }) => item.id != id);
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your Data is safe :)',
          'error'
        )
      }
    })
  }
}
