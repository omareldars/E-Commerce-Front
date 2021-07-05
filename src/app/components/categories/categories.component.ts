import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../_Services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private mycategory:CategoryService,private router: Router) { }

  categories:any[];

  p: number = 1;
  ngOnInit(): void {
    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];},
      (err)=>{console.log(err);}
    );
  }


  // delete(id: any){
  //   let result = confirm("Are you sure?");

  //   if(result){
  //     this.mycategory.deleteById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.categories = this.categories.filter((item: { id: any; }) => item.id != id);
  //     this.router.navigateByUrl('/categories');

  //   }
    
  // }

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
        this.mycategory.deleteById(id).subscribe(
          (res)=>{console.log(res);},
          (err)=>{console.log(err);}
        );
        this.categories = this.categories.filter((item: { id: any; }) => item.id != id);
        window.location.reload();
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
