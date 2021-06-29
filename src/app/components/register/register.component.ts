import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_Models/User';
import { UserService } from '../_Services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public errors: string = "";
  profileForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
    ]),
    lastname: new FormControl('', [
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    city: new FormControl('', [
      Validators.required,

    ]),
    country: new FormControl('', [
      Validators.required,

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11), Validators.maxLength(11),
    ]),
  });
  get firstname() {
    return this.profileForm.get('firstname');
  }
  get lastname() {
    return this.profileForm.get('lastname');
  }
  get username() {
    return this.profileForm.get('username');
  }
  get password() {
    return this.profileForm.get('password');
  }
  get confirmpassword() {
    return this.profileForm.get('confirmpassword');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get phone() {
    return this.profileForm.get('phone');
  }
  get city() {
    return this.profileForm.get('city');
  }
  get country() {
    return this.profileForm.get('country');
  }
  constructor(private UserService: UserService,private formBuilder:FormBuilder, private router: Router) { }


  nUser: User = new User(this.firstname?.value, this.lastname?.value, this.username?.value, this.password?.value,this.email?.value,this.phone?.value,this.city?.value,this.country?.value,this.confirmpassword?.value);
  Submit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully Registered',
      showConfirmButton: false,
      timer: 1700
    })
    this.nUser.fname = this.firstname?.value;
    this.nUser.lname = this.lastname?.value;
    this.nUser.username = this.username?.value;
    this.nUser.password = this.password?.value;
    this.nUser.email = this.email?.value;
    this.nUser.phone = this.phone?.value;
    this.nUser.city = this.city?.value;
    this.nUser.country = this.country?.value;
    this.nUser.confirmpassword = this.confirmpassword?.value;
    console.log(this.nUser)
    this.UserService.register(this.nUser).subscribe(
      d => {
        console.log(d)
        this.router.navigateByUrl('/home')
      },
      err => this.errors = 'Could not authenticate'
    )
  }
  ngOnInit(): void {
  }

}