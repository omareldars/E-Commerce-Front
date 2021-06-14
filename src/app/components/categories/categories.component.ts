import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../_Services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private mycategory:CategoryService,private router: Router) { }

  categories:any[];

  ngOnInit(): void {
    this.mycategory.getAllCategories().subscribe(
      (res)=>{this.categories = res['categories'];},
      (err)=>{console.log(err);}
    );
  }


  delete(id: any){
    let result = confirm("Are you sure?");

    if(result){
      this.mycategory.deleteById(id).subscribe(
        (res)=>{console.log(res);},
        (err)=>{console.log(err);}
      );
      this.categories = this.categories.filter((item: { id: any; }) => item.id != id);
      this.router.navigateByUrl('/categories');

    }
    
  }

}
