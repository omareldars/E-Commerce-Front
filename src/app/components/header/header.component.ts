import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public u: UserService,private router:Router) { }
  logout(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

    })
    this.u.logout();

  }

  ngOnInit(): void {
  }

}
