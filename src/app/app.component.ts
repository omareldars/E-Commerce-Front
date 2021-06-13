import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-project';
  Dashboard=true;
  // constructor(activatedroute : ActivatedRoute){
  //   // activatedroute.url.forEach(element => {
  //   //   if (element === "dashboard"){
  //   //     this.Dashboard=false;
  //   //   }
  //   // });
  //   console.log(activatedroute);
  // }
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (event['url'] == '/dashboard' || event['url'] == '/categories') {
            this.Dashboard = false;
          } else {
            // console.log("NU")
            this.Dashboard = true;
          }
        }
      });
  
}}
