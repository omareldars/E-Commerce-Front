import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any[];
  constructor(private router: Router, private myuser: UserService) { }

  ngOnInit(): void {
    this.myuser.getAllUSers().subscribe(
      (res)=>{this.users = res;},
      (err)=>{console.log(err);}
    );
  }

  delete(id:any){
    console.log("id from delete user",id);
    let result = confirm("Are you sure?");
    if(result){
      this.myuser.deleteById(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.users = this.users.filter((user: { id: any; }) => user.id != id);
      this.router.navigateByUrl('/users');

    }
  }

}
