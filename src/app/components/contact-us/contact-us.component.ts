import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact} from '../_Models/Contact';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from './../_Services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styles: [
  ]
})
export class ContactUsComponent implements OnInit {

  public errors: string = "";
  contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    subject: new FormControl('', [
      Validators.required,
     
    ]),
   
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });
  get name() {
    return this.contactForm.get('name');
  }
 
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }
  get subject() {
    return this.contactForm.get('subject');
  }
 
  constructor(private ContactService: ContactService,private formBuilder:FormBuilder, private router: Router) { }


  nContact: Contact = new Contact(this.name?.value, this.message?.value,this.email?.value,this.subject?.value);
  Send() {
    this. nContact.name = this.name?.value;
    this. nContact.message = this.message?.value;
    this. nContact.subject = this.subject?.value;
    this. nContact.email = this.email?.value;
    
    console.log(this. nContact)
    this.ContactService.add(this. nContact).subscribe(
      d => {
        console.log(d)
        // this.router.navigateByUrl('/home')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email Sent',
          showConfirmButton: false,
          timer: 1700
        })
        window.location.replace("/");
      },
      err => this.errors = 'Could not authenticate'
    )
  }
  ngOnInit(): void {
  }

}