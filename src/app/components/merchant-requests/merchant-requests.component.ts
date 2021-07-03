import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../_Services/merchant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-requests',
  templateUrl: './merchant-requests.component.html',
  styleUrls: ['./merchant-requests.component.css']
})
export class MerchantRequestsComponent implements OnInit {

  constructor(private merchant:MerchantService,private router: Router) { }

  merchants:any;
  p: number = 1;
  ngOnInit(): void {
    this.merchant.getAllwaitingMechants().subscribe(
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

 
// Approved(id:string){

//   let result = confirm("Are you sure?");

//     if(result){
//       this.merchant.approveSeller(id).subscribe(
//         (res)=>{console.log(res);},
//         (err)=>{console.log(err);}
//       );
//       // this.merchants = this.merchants.filter((item: { id: any; }) => item.id != id);
//       this.router.navigateByUrl('/merchant-requests');

//     }

// }


Approved(id:string) {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Merchant Approved',
    showConfirmButton: false,
    timer: 1700
  })
  this.merchant.approveSeller(id).subscribe(
    (res)=>{console.log(res);},
    (err)=>{console.log(err);}
  );
  this.merchants = this.merchants.filter((item: { id: any; }) => item.id != id);
  this.router.navigateByUrl('/merchant-requests');
}




// Reject(id:string){
//    let result = confirm("Are you sure?");

//     if(result){
//       this.merchant.approveSeller(id).subscribe(
//         (res)=>{console.log(res);},
//         (err)=>{console.log(err);}
//       );
//       // this.merchants = this.merchants.filter((item: { id: any; }) => item.id != id);
//       this.router.navigateByUrl('/merchant-requests');

//     }

// }


Reject(id:any){
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
        'Request has been deleted.',
        'success'
      )
      this.merchant.approveSeller(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.merchants = this.merchants.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/merchant-requests');
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
