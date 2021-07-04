import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  p: number = 1;
  users:any[];
  constructor(private router: Router, private myuser: UserService) { }

  ngOnInit(): void {
    this.myuser.getAllUSers().subscribe(
      (res)=>{this.users = res;},
      (err)=>{console.log(err);}
    );
  }

  // delete(id:any){
  //   console.log("id from delete user",id);
  //   let result = confirm("Are you sure?");
  //   if(result){
  //     this.myuser.deleteById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.users = this.users.filter((user: { id: any; }) => user.id != id);
  //     this.router.navigateByUrl('/users');

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
          'User has been deleted.',
          'success'
        )
        this.myuser.deleteById(id).subscribe(
          (res)=>{console.log(res);},
          (err)=>{console.log(err);}
        );
        this.users = this.users.filter((user: { id: any; }) => user.id != id);
      //  window.location.href='/users';
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
