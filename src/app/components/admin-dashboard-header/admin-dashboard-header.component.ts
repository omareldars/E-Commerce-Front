import { Component, OnInit } from "@angular/core";
import { ReviewService } from "../_Services/review.service";
import { OrderService } from "../_Services/order.service";
import { MerchantService } from "../_Services/merchant.service";

@Component({
  selector: "app-admin-dashboard-header",
  templateUrl: "./admin-dashboard-header.component.html",
  styleUrls: ["./admin-dashboard-header.component.css"],
})
export class AdminDashboardHeaderComponent implements OnInit {
  allReviews = [];
  allOrders = [];
  allMerchants = [];
  allOrdersTrigger = [];
  constructor(
    private reviewsServ: ReviewService,
    private ordersServ: OrderService,
    private merchant: MerchantService
  ) {}

  ngOnInit(): void {
    this.getAllReviews();
    this.getAdminOrders();
    this.getAllMerchants();
  }
  getAllReviews() {
    this.reviewsServ.getAllwaitingReviews().subscribe((res) => {
      this.allReviews = res["reviews"];
    });
  }
  getAllMerchants() {
    this.merchant.getAllwaitingMechants().subscribe(
      (res) => {
        this.allMerchants = res["merchants"];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAdminOrders() {
    this.ordersServ.getAdminOrders().subscribe((res) => {
      this.allOrders = res;
      this.allOrdersTrigger = res;
      this.filterOrdersByStatus();
    });
  }
  filterOrdersByStatus() {
    var orderArray = [];
    for (let i = 0; i < this.allOrdersTrigger.length; i++) {
      if (
        this.allOrdersTrigger[i].status != "Delivered" &&
        this.allOrdersTrigger[i].status != "Cancelled"
      ) {
        orderArray.push(this.allOrdersTrigger[i]);
      }
    }
    this.allOrders = orderArray;
  }
}
