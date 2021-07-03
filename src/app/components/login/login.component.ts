import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../_Models/User";
import { UserService } from "../_Services/user.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public errors: string = "";
  profileForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private UserService: UserService, private router: Router) {}

  get email() {
    return this.profileForm.get("email");
  }
  get password() {
    return this.profileForm.get("password");
  }
  public onSubmit() {
    console.log(this.profileForm.value);
    console.log(this.profileForm.get("email"));
    console.log(this.email?.value);
    this.UserService.login(this.email?.value, this.password?.value).subscribe(
      (result) => {
        this.UserService.token = result.token;
        localStorage.setItem("access_token", result.token!);
        localStorage.setItem("role", result["role"]);
        localStorage.setItem("access_id", result._id!);
        localStorage.setItem("access_name", result.email);
        localStorage.setItem("refresh", "0");
        // this.router.navigateByUrl("/home");
        window.location.href = "/home";
        console.log(result);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged In",
          text: "WELCOME",
          showConfirmButton: false,
          iconColor: "#fed700",
          timer: 1500,
        });
      },
      (err) => (this.errors = "Could not authenticate")
    );
  }

  ngOnInit(): void {}
}
