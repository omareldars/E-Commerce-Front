import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate } from "@angular/router";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { CartComponent } from "./components/cart/cart.component";
import { ShopListComponent } from "./components/shop-list/shop-list.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { WishListComponent } from "./components/wish-list/wish-list.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { UsersettingComponent } from "./components/usersetting/usersetting.component";
import { SellwithusComponent } from "./components/sellwithus/sellwithus.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { MerchantComponent } from "./components/merchant/merchant.component";
import { ProductsComponent } from "./components/products/products.component";
import { UsersComponent } from "./components/users/users.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { MerchantRequestsComponent } from "./components/merchant-requests/merchant-requests.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { AdminDashboardProductComponent } from "./components/admin-dashboard-product/admin-dashboard-product.component";
import { ReviewComponent } from "./components/review/review.component";
import { SearchComponent } from "./components/search/search.component";
import { CategoryProductsComponent } from "./components/category-products/category-products.component";
import { UserIfoComponent } from "./components/usersetting/user-ifo/user-ifo.component";
import { MyOrdersPageComponent } from "./components/usersetting/my-orders-page/my-orders-page.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminAuthGuard } from "./guards/adminauth.guard";

const routes: Routes = [
  // User Section
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutUsComponent },
  { path: "contact", component: ContactUsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "cart", component: CartComponent },
  { path: "addcart", component: CartComponent },
  { path: "checkout", component: CheckOutComponent },
  { path: "shop-list", component: ShopListComponent },
  { path: "wishlist", component: WishListComponent },
  { path: "product-details/:id", component: ProductDetailsComponent },
  { path: "profile", component: UsersettingComponent, children: [
      { path: "userInfo", component: UserIfoComponent, },
      { path: "myOrders", component: MyOrdersPageComponent, },
    ],
  },
  { path: "sellerrequest", component: SellwithusComponent },
  { path: "search/:title", component: SearchComponent },
  { path: "category/products/:id", component: CategoryProductsComponent },


  //  Admin Section
  { path: "dashboard", component: AdminDashboardComponent, canActivate: [AdminAuthGuard], },
  { path: "users", component: UsersComponent, canActivate: [AdminAuthGuard], },
  { path: "categories", component: CategoriesComponent, canActivate: [AdminAuthGuard], },
  { path: "merchant", component: MerchantComponent, canActivate: [AdminAuthGuard], },
  { path: "products", component: ProductsComponent, canActivate: [AdminAuthGuard], },
  { path: "add-category", component: AddCategoryComponent, canActivate: [AdminAuthGuard],},
  { path: "edit-category/:id", component: EditCategoryComponent, canActivate: [AdminAuthGuard], },
  { path: "merchant-requests", component: MerchantRequestsComponent, canActivate: [AdminAuthGuard], },
  { path: "orders", component: AdminOrdersComponent, canActivate: [AdminAuthGuard], },
  { path: "create-product", component: ProductsComponent, canActivate: [AdminAuthGuard], },
  { path: "edit-product/:id", component: EditProductComponent, canActivate: [AdminAuthGuard], },
  { path: "admin-product", component: AdminDashboardProductComponent, canActivate: [AdminAuthGuard], },
  { path: "review", component: ReviewComponent, canActivate: [AdminAuthGuard], },

  // Not Found
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
