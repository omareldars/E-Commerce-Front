import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ShopListComponent } from './components/shop-list/shop-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './components/_Services/user.service';
import { UsersettingComponent } from './components/usersetting/usersetting.component';
import { SellwithusComponent } from './components/sellwithus/sellwithus.component';
import { MerchantService } from './components/_Services/merchant.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
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
    AdminFooterComponent,
    AdminHeaderComponent,
    UsersettingComponent,
    SellwithusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })
  ],
  providers: [
    UserService,
    MerchantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
