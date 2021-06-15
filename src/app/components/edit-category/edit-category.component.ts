import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../_Models/Category';
import { CategoryService } from '../_Services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id:any;
  category:any;
  public errors: string = "";
  editcategory = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });
get name() {
  return this.editcategory.get('name');
}
get description() {
  return this.editcategory.get('description');
}


  constructor(private myActivated : ActivatedRoute, private myCategory: CategoryService, private router :Router) {
    this.id= myActivated.snapshot.params.id;
   }

  ngOnInit(): void {
    this.myCategory.getCategoryById(this.id).subscribe(
      (res)=>{
        this.category=(res);
        console.log(res);
        this.editcategory = new FormGroup({
          name : new FormControl(this.category.category.name),
          description : new FormControl(this.category.category.description),


        });
      },
      (err)=>{console.log(err)}
    )

    
    


    // this.myService.editUser(this.id,this.body).subscribe(
    //   (res)=>{console.log(res)},
    //   (err)=>{console.log(err)}
    // )
  }

  collection(){
      console.log(this.editcategory.value);
      this.myCategory.editCategory(this.id,this.editcategory.value).subscribe(
          (res)=>{console.log(res)},
          (err)=>{console.log(err)}
        )
        this.router.navigateByUrl('/categories');
  }

  cancel(){
    this.router.navigateByUrl('/categories');
  }
}