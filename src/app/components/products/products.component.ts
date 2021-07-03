import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../_Models/Product";
import { CategoryService } from "../_Services/category.service";
import { ProductService } from "../_Services/product.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  currentProduct: any = null;
  categories: any[];
  getproducts: any;
  url;
  // products:any[];
  // ProductToUpdate;
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
    return this.editproduct.get("category");
  }
  nproduct: Product = new Product(" ", " ", " ", " ", " ", " ");
  selectedFile!: File;
  addForm!: FormGroup;

  Product = new FormData();

  constructor(
    public ProductService: ProductService,
    public CategoryService: CategoryService,
    public ar: ActivatedRoute,
    public route: Router,
    public fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      product: [""],
      description: [""],
    });
  }

  ngOnInit(): void {
    this.getProduct(this.ar.snapshot.paramMap.get("id"));

    this.CategoryService.getAllCategories().subscribe(
      (res) => {
        this.categories = res["categories"];
        console.log(this.categories);
      },
      (err) => {
        console.log(err);
      }
    );

    this.ProductService.getAllProducts().subscribe(
      (res) => {
        this.products = res["products"];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onselect(event: any) {
    const filelist: FileList = event.target.files;
    this.selectedFile = filelist[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      // console.log('result : ', event.target.result);
      this.url = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  // save() {
  //   this.Product.append('title', this.nproduct.title)
  //   this.Product.append('description', this.nproduct.description)
  //   this.Product.append('price', this.nproduct.price);
  //   this.Product.append('quantity', this.nproduct.quantity);
  //   this.Product.append('photo', this.selectedFile);
  //   this.Product.append('category', this.nproduct.category);

  //   this.ProductService.add(this.Product).subscribe(
  //     a => {
  //       console.log(this.selectedFile)
  //       console.log(a)
  //       console.log(a.photo)

  //       console.log("hello"+this.Product)
  //     }
  //   )
  //   this.route.navigateByUrl('/home');
  // }

  save() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Product Created",
      showConfirmButton: false,
      timer: 1700,
    });
    this.Product.append("title", this.nproduct.title);
    this.Product.append("description", this.nproduct.description);
    this.Product.append("price", this.nproduct.price);
    this.Product.append("quantity", this.nproduct.quantity);
    this.Product.append("photo", this.selectedFile);
    this.Product.append("category", this.nproduct.category);

    this.ProductService.add(this.Product).subscribe((a) => {
      console.log(this.selectedFile);
      console.log(a);
      console.log(a.photo);

      console.log("hello" + this.Product);
    });
    this.route.navigateByUrl("/home");
  }

  getProduct(id: any): void {
    this.ProductService.getProductById(id).subscribe(
      (data) => {
        this.currentProduct = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // this is for add to cart logic by omar

  // _id: any;
  // product = this.getProduct(this.ar.snapshot.paramMap.get('id'));
  // //this.ProductService.getProductById(this_id);
  // @Output() productAdded = new EventEmitter();
  // addProductToCart(){
  //   this.productAdded.emit(this.product);
  // }

  products: Array<object> = [];
  getAllProduct(): void {
    this.ProductService.getAllProducts().subscribe((data: any) => {
      this.products = data.data;
      console.log(this.products);
    });
  }

  addItemToCart(id: any, quantity: any): void {
    let payload = {
      productId: id,
      quantity,
    };
    this.ProductService.addToCart(payload).subscribe(() => {
      this.getAllProduct();
      alert("Product Added");
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Product } from '../_Models/Product';
// import { ProductService } from '../_Services/product.service';
// import { ReviewService } from './../_Services/review.service';
// import { Review } from '../_Models/Review';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { CategoryService } from '../_Services/category.service';
// import { CartService } from '../_Services/cart.service';
// import { WishlistService } from '../_Services/wishlist.service';
// @Component({
//   selector: 'app-product-details',
//   templateUrl: './product-details.component.html',
//   styles: [
//   ]
// })
// export class ProductDetailsComponent implements OnInit {

//   product:any=null;
//   modalRate;
//   modalReview;

// public errors: string = "";

// profileForm = new FormGroup({
//   title: new FormControl('', [
//     Validators.required,
//   ]),
//   rating: new FormControl('', [
//     Validators.required,
//     Validators.minLength(1)
//   ]),
//   review: new FormControl('', [
//     Validators.required,
//   ]),
// });

// get title() {
//   return this.profileForm.get('title');
// }
// get rating() {
//   return this.profileForm.get('rating');
// }
// get review() {
//   return this.profileForm.get('review');
// }
// // get product() {
// //   return this.profileForm.get('product');
// // }
// nreview: Review = new Review(this.title?.value, this.rating?.value,this.review?.value,this.product?.value);
//   // constructor(private myproduct:ProductService,private myreview:ReviewService,  public ar:  ActivatedRoute) { }
//   constructor(private myproduct:ProductService,public s:CategoryService,public ar:ActivatedRoute,private mycategory:CategoryService,private myCart:CartService,private myreview:ReviewService,private mywishlist:WishlistService,private router: Router) { }

//   ngOnInit(): void {
//     this.getProduct(this.ar.snapshot.paramMap.get('id'));
//   }

//   getProduct(id:any): void {
//     this.myproduct.getProductById(id)
//       .subscribe(
//         data => {
//         this.product= data;
//           console.log(data);
//         },
//         error => {
//           console.log(error);
//         });
//   }

//   rateProduct(Productid){
//     this.nreview.rating = this.rating?.value;
//     this. nreview.review = this.review?.value;

//     this.nreview.product=Productid;

//        this.myreview.add(this.nreview).subscribe(
//           d => {
//               console.log(d)
//               // this.router.navigateByUrl('/home')
//             },
//             err => this.errors = 'Could not authenticate'

//           // console.log(rating,Productid);
//           // console.log(this.nreview);
//           );
//    }
//    AllProductReviews:any=[];
//    getAllReviews(productId){
//      console.log(productId);
//     this.myreview.getProductReviews(productId).subscribe(
//       d => {
//           console.log(d)
//           this.AllProductReviews = d;
//         },
//         err => this.errors = 'Could not authenticate'

//       // console.log(rating,Productid);
//       // console.log(this.nreview);
//       );
//    }

//   }
