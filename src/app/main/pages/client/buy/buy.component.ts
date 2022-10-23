import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component } from "@angular/core";
import { Item } from "src/app/main/interfaces/item.interface";
import { LocalStorageService } from "src/app/main/services/local-storage.service";
import { ProductService } from "src/app/main/services/product.service";

@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.css'],
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: { displayDefaultIndicatorType: false }
      }
    ]
  })
export class BuyComponent {
  
  item: Item = {};
  shoppingCart: Item[] = [];
  shoppingCart$ = this.localStorageService.shoppingCart$;

  constructor(private localStorageService: LocalStorageService, private productService: ProductService) {}

  remove( position: number ): void {
    this.localStorageService.removeFromShoppingCart(position);
  }
  
}