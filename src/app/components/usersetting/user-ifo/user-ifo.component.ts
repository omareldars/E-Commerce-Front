import { Component, OnInit } from "@angular/core";
import { User } from "../../_Models/User";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../_Services/user.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-user-ifo",
  templateUrl: "./user-ifo.component.html",
  styleUrls: ["./user-ifo.component.css"],
})
export class UserIfoComponent implements OnInit {
  Euser: User;
  constructor(
    private UserService: UserService,
    private ar: ActivatedRoute,
    private router: Router
  ) {}
  save() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-danger",
        confirmButton: "btn btn-success",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        position: "center",
        icon: "question",
        title: "Are You Sure?!",
        text:" You are about to edit your data!!",
        iconColor: "#87adbd",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Edit",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Saving Changes",
            "Your data will be Updated",
            "success"
          );
          this.UserService.EditData(this.Euser).subscribe((d) => console.log(d));
          window.location.reload();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your review won't be written",
            "error"
          );
        }
      });
  }
  delete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-danger",
        confirmButton: "btn btn-success",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        position: "center",
        icon: "question",
        title: "Are You Sure?!",
        text:" You are about to delete your data!!",
        iconColor: "#87adbd",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleting Account",
            "Your Account will be deleted",
            "success"
          );
          this.UserService.RemoveAc().subscribe((d) => console.log(d));
          this.UserService.logout();
          window.location.href = "/register";
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Account is Save",
            "info"
          );
        }
      });
    // console.log(this.Euser);
    // var c = confirm("Are You Sure ???");
    // if (c == true) {
    //   this.UserService.RemoveAc().subscribe((d) => console.log(d));
    //   this.UserService.logout();
    //   this.router.navigateByUrl("/register");
    // } else {
    //   window.location.href = "/home";
    // }
  }
  ngOnInit(): void {
    this.UserService.getme().subscribe((d) => {
      console.log(d);
      this.Euser = d;
    });
  }
}
