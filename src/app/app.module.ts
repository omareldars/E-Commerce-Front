import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { JwtModule } from "@auth0/angular-jwt";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { ErrorComponent } from "./components/error/error.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { ShopListComponent } from "./components/shop-list/shop-list.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { WishListComponent } from "./components/wish-list/wish-list.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { UserService } from "./components/_Services/user.service";
import { UsersettingComponent } from "./components/usersetting/usersetting.component";
import { SellwithusComponent } from "./components/sellwithus/sellwithus.component";
import { MerchantService } from "./components/_Services/merchant.service";
import { CategoriesComponent } from "./components/categories/categories.component";
import { MerchantComponent } from "./components/merchant/merchant.component";
import { UsersComponent } from "./components/users/users.component";
import { ProductsComponent } from "./components/products/products.component";
import { AdminDashboardHeaderComponent } from "./components/admin-dashboard-header/admin-dashboard-header.component";
import { AdminDashboardFooterComponent } from "./components/admin-dashboard-footer/admin-dashboard-footer.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { CategoryService } from "./components/_Services/category.service";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { MerchantRequestsComponent } from "./components/merchant-requests/merchant-requests.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { AdminDashboardProductComponent } from "./components/admin-dashboard-product/admin-dashboard-product.component";
import { ProductService } from "./components/_Services/product.service";
import { ReviewComponent } from "./components/review/review.component";
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SearchComponent } from "./components/search/search.component";
import { CategoryProductsComponent } from "./components/category-products/category-products.component";
// import { ProductComponent } from './components/product/product.component';
import { NgxStripeModule } from "ngx-stripe";
import { UserIfoComponent } from "./components/usersetting/user-ifo/user-ifo.component";
import { MyOrdersPageComponent } from "./components/usersetting/my-orders-page/my-orders-page.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminAuthGuard } from "./guards/adminauth.guard";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CheckOutComponent,
    ShopListComponent,
    ProductDetailsComponent,
    WishListComponent,
    AdminDashboardComponent,
    UsersettingComponent,
    SellwithusComponent,
    CategoriesComponent,
    MerchantComponent,
    UsersComponent,
    ProductsComponent,
    AdminDashboardHeaderComponent,
    AdminDashboardFooterComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    MerchantRequestsComponent,
    EditProductComponent,
    AdminDashboardProductComponent,
    ReviewComponent,
    SearchComponent,
    CategoryProductsComponent,
    WishListComponent,
    UserIfoComponent,
    MyOrdersPageComponent,
    AdminOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxStripeModule.forRoot(
      "pk_test_51J5s3JGD6Ss3xWkUTDhEZoRF6kce36HvIKc2mr53VBaDjrYZosfvMH4ygo4WlpCELJwxMfTBoKfuDSSOZ0b88naI00MhjQqYpG"
    ),

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    NgbModule,
  ],
  providers: [
    UserService,
    MerchantService,
    CategoryService,
    ProductService,
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
