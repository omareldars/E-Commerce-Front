import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from './../_Services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  constructor(private review:ReviewService,private router: Router) { }

  reviews:any;
  p: number = 1;
  ngOnInit(): void {
    this.review.getAllwaitingReviews().subscribe(
      (res)=>{this.reviews= res['reviews'];},
      (err)=>{console.log(err);}
    );
  }


  // delete(id: any){
  //   let result = confirm("Are you sure?");

  //   if(result){
  //     this.review.deleteById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
  //     this.router.navigateByUrl('/review');

  //   }
    
  // }

 
Approved(id:string){

  // let result = confirm("Are you sure?");

    // if(result){
    //   this.review.approveReview(id).subscribe(
    //     (res)=>{console.log(res);},
    //     (err)=>{console.log(err);}
    //   );
    //   this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
    //   window.location.reload();

    // }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-danger",
        confirmButton: "btn btn-success",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You wont to approve this merchant !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
        cancelButtonText: "No, cancel!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Approved!",
            "Merchant has been Approved.",
            "success"
          );
          if(result){
              this.review.approveReview(id).subscribe(
                (res)=>{console.log(res);},
                (err)=>{console.log(err);}
              );
              this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
              window.location.reload();
        
            }
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Data is safe :)",
            "error"
          );
        }
      });

}



// Reject(id:string){
//    let result = confirm("Are you sure?");

//     if(result){
//       this.review.rejectReview(id).subscribe(
//         (res)=>{console.log(res);},
//         (err)=>{console.log(err);}
//       );
//       this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
//       this.router.navigateByUrl('/review');


//     }

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
        'Review has been deleted.',
        'success'
      )
      this.review.rejectReview(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.reviews = this.reviews.filter((item: { id: any; }) => item.id != id);
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
