import { Component, Input, OnInit } from "@angular/core";
import { OrderService } from "../../_Services/order.service";
import Swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-my-orders-page",
  templateUrl: "./my-orders-page.component.html",
  styleUrls: ["./my-orders-page.component.css"],
})
export class MyOrdersPageComponent implements OnInit {
  @Input() isAdmin;
  newStatus;
  allOrders = [];
  allOrdersTrigger = [];
  currentOrder;
  orderStatuses = [
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  currentStatus: string;
  filteredLayout = false;
  constructor(private ordersServ: OrderService, private route: ActivatedRoute) {
    if (String(document.location.href).includes("profile")) {
      this.getAllOrders();
    }
    this.route.queryParams.subscribe((params) => {
      if (params["order"]) {
        this.filteredLayout = true;
      }
    });
  }

  ngOnInit(): void {}
  changeStatus(optionsValue) {
    this.currentStatus = optionsValue;
    this.filterOrdersByStatus();
  }
  getAllOrders() {
    this.ordersServ.getOrders().subscribe((res) => {
      this.allOrders = res;
      this.allOrdersTrigger = res;
    });
  }
  filterOrdersByStatus() {
    if (this.currentStatus != "") {
      var orderArray = [];
      for (let i = 0; i < this.allOrdersTrigger.length; i++) {
        if (this.allOrdersTrigger[i].status == this.currentStatus) {
          orderArray.push(this.allOrdersTrigger[i]);
        }
      }
      this.allOrders = orderArray;
    } else {
      this.allOrders = this.allOrdersTrigger;
    }
  }
  getOrderFiltered() {
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
  changeOrderStatus() {
    this.ordersServ
      .editOrderById(this.allOrders[this.currentOrder]._id, {
        status: this.newStatus,
      })
      .subscribe((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Order Status Updated",
          iconColor: "#fed700",
          timer: 1500,
        });
        document.getElementById("closeModalBtn").click();
        this.allOrders[this.currentOrder].status = this.newStatus;
      });
    // console.log("newStatus : ", this.newStatus);
  }
  DeleteOrder(id: any, orderIndex) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: "btn btn-danger",
        confirmButton: "btn btn-success",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          this.ordersServ.deleteOrderById(id).subscribe(
            (res) => {
              this.allOrders.splice(orderIndex, 1);
            },
            (err) => {
              this.allOrders.splice(orderIndex, 1);
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Data is safe :)",
            "error"
          );
        }
      });
  }
  getAdminOrders() {
    this.ordersServ.getAdminOrders().subscribe((res) => {
      this.allOrders = res;
      this.allOrdersTrigger = res;
      if (this.filteredLayout) {
        this.getOrderFiltered();
      }
    });
  }
  ngOnChanges(e) {
    if (!this.isAdmin) {
      this.getAllOrders();
    } else {
      this.getAdminOrders();
    }
  }
}
