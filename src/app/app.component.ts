import { Component } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "final-project";
  Dashboard = true;
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
      if (event instanceof NavigationEnd) {
        if (
          event["url"] == "/dashboard" ||
          event["url"] == "/categories" ||
          event["url"] == "/add-category" ||
          event["url"].includes("/edit-category/") ||
          event["url"] == "/merchant-requests" ||
          event["url"] == "/merchant" ||
          event["url"] == "/admin-product" ||
          event["url"] == "/review" ||
          event["url"] == "/users" ||
          event["url"] == "/orders" ||
          event["url"] == "/orders?order=layout"
        ) {
          this.Dashboard = false;
        } else {
          // console.log("NU")
          this.Dashboard = true;
        }
      }
    });
  }
}
