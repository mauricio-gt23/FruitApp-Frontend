import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "src/app/main/interfaces/order.interface";
import { SaleService } from "src/app/main/services/sale.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
  })
export class OrderComponent implements OnInit {

  userId: any;
  orders: Order[] = [];

  constructor(private route: Router, private saleService: SaleService) {
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.saleService.getSaleByUserId(this.userId).subscribe( (data) => {
      this.orders= data.result.content;
      this.orders.sort( function(objA, objB){
        return objB.createdAt.localeCompare(objA.createdAt);
      })
    })
  }
  
  color( status: string ): string {
    if (status === 'PENDING') {
      return 'status__pending'
    }
    return 'status__send';
  }

  seeDetail( i: number ): void {
    this.route.navigate([`main/myorders/${i}`])
  }

}