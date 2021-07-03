import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../_Models/User";
import { UserService } from "../_Services/user.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public errors: string = "";
  profileForm = new FormGroup({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    address: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmpassword: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    avatar: new FormControl("", [Validators.required]),
  });
  get firstname() {
    return this.profileForm.get("firstname");
  }
  get lastname() {
    return this.profileForm.get("lastname");
  }
  get username() {
    return this.profileForm.get("username");
  }
  get password() {
    return this.profileForm.get("password");
  }
  get confirmpassword() {
    return this.profileForm.get("confirmpassword");
  }
  get email() {
    return this.profileForm.get("email");
  }
  get phone() {
    return this.profileForm.get("phone");
  }
  get city() {
    return this.profileForm.get("city");
  }
  get address() {
    return this.profileForm.get("address");
  }
  get country() {
    return this.profileForm.get("country");
  }
  get avatar() {
    return this.profileForm.get("avatar");
  }
  
  nUser = new User(" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ")
  selectedFile!: File;
  addForm!: FormGroup;
  User = new FormData();
  url;
  constructor(
    private UserService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Don't Know what is this
    this.addForm = this.fb.group({
      user: [""]
    });
  }


  // product onselect method
  onselect(event: any) {
    const filelist: FileList = event.target.files;
    this.selectedFile = filelist[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      // console.log('result : ', event.target.result);
      this.url = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  
  // main onselect method
  // onselect(event: any) {
  //   const filelist: FileList = event.target.files;
  //   this.selectedFile = filelist[0];
  //   const reader = new FileReader();
  //   reader.addEventListener(
  //     "load",
  //     function () {
  //       // this.imgSrc=reader.result;
  //       localStorage.setItem("profilimg", String(reader.result));
  //     },
  //     false
  //   );
  //   if (this.selectedFile) {
  //     reader.readAsDataURL(this.selectedFile);
  //   }
  // }

  // nUser: User = new User(
  //   this.firstname?.value,
  //   this.lastname?.value,
  //   this.username?.value,
  //   this.password?.value,
  //   this.email?.value,
  //   this.phone?.value,
  //   this.address?.value,
  //   this.city?.value,
  //   this.country?.value,
  //   this.confirmpassword?.value,
  //   this.avatar?.value
  // );


  Submit() {
    // this.nUser.fname = this.firstname?.value;
    // this.nUser.lname = this.lastname?.value;
    // this.nUser.username = this.username?.value;
    // this.nUser.password = this.password?.value;
    // this.nUser.email = this.email?.value;
    // this.nUser.phone = this.phone?.value;
    // this.nUser.address = this.address?.value;
    // this.nUser.city = this.city?.value;
    // this.nUser.country = this.country?.value;
    // this.nUser.confirmpassword = this.confirmpassword?.value;
    // this.nUser.avatar = localStorage.getItem("profilimg");
    this.User.append("fname", this.nUser.fname);
    this.User.append("lname", this.nUser.lname);
    this.User.append("username", this.nUser.username);
    this.User.append("password", this.nUser.password);
    this.User.append("email", this.nUser.email);
    this.User.append("phone", this.nUser.phone);
    this.User.append("address", this.nUser.address);
    this.User.append("city", this.nUser.city);
    this.User.append("country", this.nUser.country);
    this.User.append("confirmpassword", this.nUser.confirmpassword);
    this.User.append("avatar", this.selectedFile);

    // this.Product.append('photo', this.selectedFile);
    // console.log(this.nUser);
    this.UserService.register(this.User).subscribe(
      (d) => {
        console.log("nUser  :  ",this.User);
        console.log("d :  ",d);
        console.log("SelectedFile  :  ",this.selectedFile);
        // localStorage.removeItem("profilimg");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Registered",
          showConfirmButton: false,
          timer: 1700,
        });
    window.location.href = "/home";
      },
      (err) => (this.errors = "Could not authenticate")
    );
  }
  ngOnInit(): void {}
}
