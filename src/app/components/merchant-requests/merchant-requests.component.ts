import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../_Services/merchant.service';

@Component({
  selector: 'app-merchant-requests',
  templateUrl: './merchant-requests.component.html',
  styleUrls: ['./merchant-requests.component.css']
})
export class MerchantRequestsComponent implements OnInit {

  constructor(private merchant:MerchantService,private router: Router) { }

  merchants:any;

  ngOnInit(): void {
    this.merchant.getAllwaitingMechants().subscribe(
      (res)=>{this.merchants= res['merchants'];},
      (err)=>{console.log(err);}
    );
  }


  // delete(id: any){
  //   let result = confirm("Are you sure?");

  //   if(result){
  //     this.merchant.deleteById(id).subscribe(
  //       (res)=>{console.log(res);},
  //       (err)=>{console.log(err);}
  //     );
  //     this.categories = this.categories.filter((item: { id: any; }) => item.id != id);
  //     this.router.navigateByUrl('/categories');

  //   }
    
  // }

 
Approved(id:string){

  let result = confirm("Are you sure?");

    if(result){
      this.merchant.approveSeller(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.merchants = this.merchants.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/merchant-requests');

    }

}


}
