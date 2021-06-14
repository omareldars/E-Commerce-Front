import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../_Models/Category';
import { CategoryService } from '../_Services/category.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})


export class AddCategoryComponent implements OnInit {
  public errors: string = "";
  profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });
  get name() {
    return this.profileForm.get('name');
  }
  get description() {
    return this.profileForm.get('description');
  }
 
  
  constructor(private CategoryService: CategoryService,private formBuilder:FormBuilder, private router: Router) { }



  ncategory: Category = new Category(this.name?.value, this.description?.value);
  Submit() {
    this.ncategory.name = this.name?.value;
    this.ncategory.description = this.description?.value;

    console.log(this.ncategory)
    this.CategoryService.add(this.ncategory).subscribe(
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
  // currentCategory:any=null;
  // // ProductToUpdate;

  // ncategory: Category = new Category(" ", " ");
  // // selectedFile!: File;
  // addForm!: FormGroup;

  // Category = new FormData();

  // constructor(public CategoryService: CategoryService, public ar:  ActivatedRoute, public route: Router, public fb: FormBuilder) {
  //   this.addForm = this.fb.group({
  //     name: '',
  //     description: ''
  //   })
  // }


  // ngOnInit(): void {
  //   // this.getCategory(this.ar.snapshot.paramMap.get('id'));

  // }

  // save() {
  //   this.Category.append('name', this.ncategory.name)
  //   this.Category.append('description', this.ncategory.description)

  //     console.log( this.ncategory.name)
  //     console.log( this.ncategory.description)


  //   this.CategoryService.add(this.Category).subscribe(
  //     a => {
  //       console.log("hello"+this.Category)
  //     }
  //   )
  //   this.route.navigateByUrl('/categories');
  // }


  
  // // getCategory(id:any): void {
  // //   this.CategoryService. getCategoryById(id)
  // //     .subscribe(
  // //       data => {
  // //       this.currentCategory= data;
  // //         console.log(data);
  // //       },
  // //       error => {
  // //         console.log(error);
  // //       });


  // // }


