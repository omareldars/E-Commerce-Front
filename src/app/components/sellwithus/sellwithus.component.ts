import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MerchantService } from '../_Services/merchant.service';
import { Merchant } from './../_Models/Merchant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellwithus',
  templateUrl: './sellwithus.component.html',
  styleUrls: ['./sellwithus.component.css']
})
export class SellwithusComponent implements OnInit {
  public errors: string = "";
  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
  
    business: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11), Validators.maxLength(11),
    ]),
  });
  get name() {
    return this.profileForm.get('name');
  }
 
  get email() {
    return this.profileForm.get('email');
  }
  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }
  get business() {
    return this.profileForm.get('business');
  }
 
  constructor(private MerchantService: MerchantService,private formBuilder:FormBuilder, private router: Router) { }

  nUser: Merchant = new Merchant(this.name?.value, this.email?.value, this.business?.value, this.phoneNumber?.value);
  Submit() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Request Sent',
      showConfirmButton: false,
      timer: 1700
    })
    this.nUser.name = this.name?.value;
    this.nUser.email = this.email?.value;
    this.nUser.phoneNumber = this.phoneNumber?.value;
    this.nUser.business= this.business?.value;
    console.log(this.nUser)
    this.MerchantService.sellerRequest(this.nUser).subscribe(
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