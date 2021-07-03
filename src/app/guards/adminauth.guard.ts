import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("access_id")) {
      if (localStorage.getItem("role") == "ROLE_ADMIN") {
        return true;
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You Don't Have Any Permission To Access his Pages",
          text: "Access Denied",
          showConfirmButton: false,
          iconColor: "#fed700",
          timer: 1500,
        });
      }
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
