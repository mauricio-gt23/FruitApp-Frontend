import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-orderdetail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
  })
export class OrderDetailComponent implements OnInit {

  orderId: any;

  constructor(private activatedReoute: ActivatedRoute) {
    this.activatedReoute.params.subscribe( params => {
      this.orderId = params['id'];
      this.orderId = Number.parseInt(this.orderId);
    });
  }

  ngOnInit(): void {
  
  }

}