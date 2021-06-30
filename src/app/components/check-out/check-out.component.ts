import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { User } from '../_Models/User';
import { UserService } from '../_Services/user.service';
import { OrderService } from '../_Services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styles: [
  ]
})
export class CheckOutComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;
  carts:any;

  constructor(private fb: FormBuilder, private stripeService: StripeService,private http:HttpClient, private UserService: UserService, private orderservice:OrderService) {}


  Euser : User;
  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      // email: ['', [Validators.required]]
    });

    this.UserService.getme().subscribe(
      d => {
        console.log(d)
        this.Euser = d
    });


    this.carts = this.orderservice.cardDetails$?.value;
    console.log(" on init carts--->",this.carts);

  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);  
          this.http.post("http://localhost:3000/payme",
          {
            token : result.token.id
          }).subscribe(
            (res)=>{
              console.log("The response from server is ",res);
              console.log('Payment Done')
            },
            (err)=>{
              console.log('The error is ',err)
            })
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      }
    );
  }



}