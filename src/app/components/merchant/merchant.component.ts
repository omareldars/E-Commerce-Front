import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MerchantService } from '../_Services/merchant.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  constructor(private merchant:MerchantService,private router: Router) { }

  merchants:any;

  ngOnInit(): void {
    this.merchant.getAllApprovalMechants().subscribe(
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

//   SellerRequest(merchant:any){
// this.merchant.sellerRequest(merchant).subscribe(
//   (res)=>{console.log(res)},
//   (err)=>{console.log(err)}
// )
// this.router.navigateByUrl('/merchants');

//   }
}
