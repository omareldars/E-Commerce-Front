import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "../_Services/category.service";
import { ProductService } from "../_Services/product.service";
import { Product } from "./../_Models/Product";
import { Category } from "./../_Models/Category";
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  id: any;
  product: any;
  categories: any[];
  public errors: string = "";
  editproduct = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
    ]),
    price: new FormControl("", [Validators.required, Validators.min(1)]),
    quantity: new FormControl("", [Validators.required, Validators.min(1)]),
    photo: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
  });
  get title() {
    return this.editproduct.get("title");
  }
  get description() {
    return this.editproduct.get("description");
  }
  get photo() {
    return this.editproduct.get("photo");
  }
  get price() {
    return this.editproduct.get("price");
  }
  get quantity() {
    return this.editproduct.get("quantity");
  }
  get category() {
    let catid: any = this.editproduct.get("category");
    let cat_name = this.myCategory.getCategoryById(catid);
    return cat_name;
  }
  constructor(
    private myActivated: ActivatedRoute,
    private myCategory: CategoryService,
    private router: Router,
    private myproduct: ProductService
  ) {
    this.id = myActivated.snapshot.params.id;
  }

  ngOnInit(): void {
    this.myproduct.getProductById(this.id).subscribe(
      (res) => {
        this.product = res;
        console.log("______________________________________");
        console.log(res);
        this.editproduct = new FormGroup({
          title: new FormControl(this.product.title),
          description: new FormControl(this.product.description),
          price: new FormControl(this.product.price),
          quantity: new FormControl(this.product.quantity),
          category: new FormControl(this.product.category),
          photo: new FormControl(this.product.photo),
        });
      },
      (err) => {
        console.log(err);
      }
    );
    this.myCategory.getAllCategories().subscribe(
      (res) => {
        this.categories = res["categories"];
        console.log(this.categories);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  collection() {
    console.log(this.editproduct.value);
    this.myproduct.editProduct(this.id, this.editproduct.value).subscribe(
      (res) => {
        console.log(res);
        console.log("pppppppppppppppppppppppp", this.product);
        console.log("eeeeeeeeeeeeeeeeeeeee", this.editproduct.value);
      },

      (err) => {
        console.log(err);
      }
    );
    this.router.navigateByUrl("/home");
  }

  cancel() {
    this.router.navigateByUrl("/profile/userInfo");
  }
}
