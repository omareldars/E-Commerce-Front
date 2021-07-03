import { Component, OnInit } from '@angular/core';
import { Product } from '../_Models/Product';
import { ProductService } from '../_Services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search :Product []=[];
  constructor(public s:ProductService,public ar:ActivatedRoute) {}

  ngOnInit(): void {
    let str :string =""
        this.ar.params.subscribe(
        a=> {str = a['title']
        console.log("this is A ===>> ", a)     
        console.log("this is str ===>> ",str)
        }
        )
        this.s.searchbyTitle(str).subscribe(
          a=>{
            this.search = a
            console.log("this is A from func ===>> " ,a)
            console.log("this is str from func ===>> ",str)
            console.log("this is typeof from func ===>> ",typeof( this.search));
          }
        )

      }
    
    addToCart(product:any){

    }
    addtoWishlist(id:any){

    }
    Rate(rating:number,Productid){

    }
  }