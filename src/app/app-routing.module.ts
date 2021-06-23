import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {CheckOutComponent} from "./components/check-out/check-out.component";
import {CartComponent} from "./components/cart/cart.component";
import {ShopListComponent} from "./components/shop-list/shop-list.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {WishListComponent} from "./components/wish-list/wish-list.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import { UsersettingComponent } from './components/usersetting/usersetting.component';
import { SellwithusComponent } from './components/sellwithus/sellwithus.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { ProductsComponent } from './components/products/products.component';
import { UsersComponent } from './components/users/users.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { MerchantRequestsComponent } from './components/merchant-requests/merchant-requests.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AdminDashboardProductComponent } from './components/admin-dashboard-product/admin-dashboard-product.component';
import { ReviewComponent } from './components/review/review.component';
import { SearchComponent } from './components/search/search.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';

const routes: Routes = [
// User Section
  {path: '',redirectTo:"home", pathMatch:"full"},
  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutUsComponent},
  {path: 'contact', component:ContactUsComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'cart', component:CartComponent},
  {path: 'checkout', component:CheckOutComponent},
  {path: 'shop-list', component:ShopListComponent},
  {path: 'wish-list', component:WishListComponent},
  {path: 'product-details/:id', component:ProductDetailsComponent},
  {path: 'profile',component:UsersettingComponent},
  {path:'sellerrequest',component:SellwithusComponent},
  {path: 'search/:title', component:SearchComponent},
  {path: 'category/products/:id', component:CategoryProductsComponent},
  //  Admin Section
  {path: 'dashboard', component: AdminDashboardComponent},
  {path: 'users', component:UsersComponent},
  {path: 'categories', component:CategoriesComponent},
  {path: 'merchant', component:MerchantComponent},
  {path: 'products', component:ProductsComponent},
  {path: 'add-category', component:AddCategoryComponent},
  {path: 'edit-category/:id', component:EditCategoryComponent},
  {path: 'merchant-requests', component:MerchantRequestsComponent},
  {path: 'create-product', component:ProductsComponent},
  {path: 'edit-product/:id', component:EditProductComponent},
  {path: 'admin-product', component:AdminDashboardProductComponent},
  {path: 'addcart', component:CartComponent},
  {path: 'review', component:ReviewComponent},
  





  // Not Found
  {path: '**', component:ErrorComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
