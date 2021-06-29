import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../_Services/merchant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  constructor(private merchant:MerchantService,private router: Router) { }

  merchants:any;

  ngOnInit(): void {
    this.merchant.getAllApprovalMechants().subscribe(
      (res)=>{this.merchants= res['merchants'];},
      (err)=>{console.log(err);}
    );
  }


  // delete(id: any){
  //   let result = confirm("Are you sure?");

  //   if(result){
  //     this.merchant.deleteById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.categories = this.categories.filter((item: { id: any; }) => item.id != id);
  //     this.router.navigateByUrl('/categories');

  //   }
    
  // }

//   SellerRequest(merchant:any){
// this.merchant.sellerRequest(merchant).subscribe(
//   (res)=>{console.log(res)},
//   (err)=>{console.log(err)}
// )
// this.router.navigateByUrl('/merchants');

//   }

delete(id:any){
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
        'Category has been deleted.',
        'success'
      )
    //  this.merchant.deleteById(id).subscribe(
    //     (res)=>{console.log(res);},
    //     (err)=>{console.log(err);}
    //   );
    //   this.categories = this.categories.filter((item: { id: any; }) => item.id != id);
    //   this.router.navigateByUrl('/categories');
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
