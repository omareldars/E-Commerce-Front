import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_Models/User';
import { UserService } from '../_Services/user.service';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.css']
})
export class UsersettingComponent implements OnInit {
  Euser !: User;
  constructor(private UserService: UserService, private ar: ActivatedRoute, private router: Router) { }
  save() {
    console.log(this.Euser)

    this.UserService.EditData(this.Euser).subscribe(
      d => console.log(d)
    )
    alert("Your change is done :)");
    this.router.navigateByUrl("/home")
  }
  delete() {
    console.log(this.Euser)
    var c = confirm("Are You Sure ???");
    if (c == true) {

      this.UserService.RemoveAc().subscribe(
        d => console.log(d)
      )
      this.UserService.logout();
      this.router.navigateByUrl("/register")
    } else {
      this.router.navigateByUrl("/home")
    }

  }
  ngOnInit(): void {
    this.UserService.getme().subscribe(
      d => {
        console.log(d)
        this.Euser = d
      }
      )
  
    }
  
  }
  
