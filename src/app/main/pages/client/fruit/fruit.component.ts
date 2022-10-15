import { Component } from "@angular/core";
import { Product } from "src/app/main/interfaces/product.interface";
import { ProductService } from "src/app/main/services/product.service";

@Component({
    selector: 'app-fruit',
    templateUrl: './fruit.component.html',
    styleUrls: ['./fruit.component.css']
  })
export class FruitComponent {

  fruits: Product[] = [];
  countArray: number[] = [];

  constructor(private productService: ProductService) {
    this.productService.getAllFruit().subscribe( (data: any) => {
        this.fruits = data.result.content;
        this.countArray.length = this.fruits.length;
        for (let i = 0; i < this.countArray.length; i++) {
            this.countArray[i] = 1;
        };
    });
  }
}