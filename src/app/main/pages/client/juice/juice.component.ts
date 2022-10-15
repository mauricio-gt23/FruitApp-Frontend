import { Component } from "@angular/core";
import { Product } from "src/app/main/interfaces/product.interface";
import { ProductService } from "src/app/main/services/product.service";

@Component({
    selector: 'app-juice',
    templateUrl: './juice.component.html',
    styleUrls: ['./juice.component.css']
  })
export class JuiceComponent {

  juices: Product[] = [];
  countArray: number[] = [];

  constructor(private productService: ProductService) {
    this.productService.getAllJuice().subscribe( (data: any) => {
        this.juices = data.result.content;
        this.countArray.length = this.juices.length;
        for (let i = 0; i < this.countArray.length; i++) {
            this.countArray[i] = 1;
        };
    });
  }
  
}