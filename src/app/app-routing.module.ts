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
  {path: 'product-details', component:ProductDetailsComponent},
  {path: 'profile',component:UsersettingComponent},
  {path:'sellerrequest',component:SellwithusComponent},
  //  Admin Section
  {path: 'dashboard', component: AdminDashboardComponent},
  // Not Found
  {path: '**', component:ErrorComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
