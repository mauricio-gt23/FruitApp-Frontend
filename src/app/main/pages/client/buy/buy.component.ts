import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "src/app/main/components/snackbar/snackbar.component";
import { Card } from "src/app/main/interfaces/card.interface";
import { Item } from "src/app/main/interfaces/item.interface";
import { SaleDetail } from "src/app/main/interfaces/sale-detail.interface";
import { Sale } from "src/app/main/interfaces/sale.interface";
import { LocalStorageService } from "src/app/main/services/local-storage.service";
import { ProductService } from "src/app/main/services/product.service";
import { SaleService } from "src/app/main/services/sale.service";

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
  
  showMessage: boolean = false;
  totalPrice: number = 0;
  items: Item[] = [];
  shoppingCart$ = this.localStorageService.shoppingCart$;
  card: Card = {};
  sale: Sale = {};
  saleDetail: SaleDetail = {};
  miForm: FormGroup = this.fb.group({
    name: [ this.card.name, [Validators.required]],
    number: [ this.card.number, [Validators.required]],
    expiration: [this.card.expiration, [Validators.required]],
    cvv: [ this.card.cvv, [Validators.required, Validators.maxLength(3)]]
  });

  constructor( private localStorageService: LocalStorageService, private productService: ProductService, private fb: FormBuilder, 
               private _snackBar: MatSnackBar, private saleService: SaleService) {
    this.sale.userId = localStorage.getItem('userId');
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.totalPrice = 0;
    this.items = this.localStorageService.getShoppingCart();
    this.items.forEach( item => {
      this.totalPrice += item.product?.price! * item.quantity!;
    })
  }

  remove( position: number ): void {
    this.localStorageService.removeFromShoppingCart(position);
    this.getTotalPrice();
  }

  fieldInvalid( field: string ): any {
    return this.miForm.controls[field].errors && this.miForm.controls[field].touched;
  }
  
  openSnackBar(): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 5 * 1000,
    });
  }

  pay(): void {
    if (this.miForm.valid) {
      this.sale.totalPrice = this.totalPrice;
      this.saleService.postSale(this.sale).subscribe( (sale)=> {
        let id = sale.result.id;
        this.items.forEach( item => {
          this.saleDetail.productId = item.product?.id;
          this.saleDetail.quantityProduct = item.quantity;
          this.saleService.postSaleDetail(id, this.saleDetail).subscribe( (_)=> {
            // *-*
          });
        });
        this.localStorageService.resetShoppingCart();
        this.openSnackBar();
        this.showMessage = false;
      });
    } else {
      this.showMessage = true;
    }
  }

}