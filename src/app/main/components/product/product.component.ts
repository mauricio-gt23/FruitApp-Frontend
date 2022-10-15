import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { QuantityProduct } from '../../interfaces/quantity-product.interface';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent {

    @Input() products: Product[] = [];
    @Input() countArray: number[] = [];
    currentRoute: string = '';

    word: string = ''; 
    productsSuggested: Product[] = [];
    mistakes: boolean = false;
    shoppingCart: QuantityProduct[] = [];
    displaySuggestions: boolean = false;
    qProduct: QuantityProduct = {
        id: 0,
        quantity: 0
    };

    constructor(private productService: ProductService, private route: Router) {
        this.route.events.subscribe( event => {
            if(event instanceof NavigationEnd) {
              this.currentRoute = event.url;
            }
          });
    }

    plus( position:number ): void {
        for (let i = 0; i < this.countArray.length; i++) {
        if (i === position) {
            if (this.countArray[i] === 0) {
            console.log(this.countArray[i]);
            this.countArray[i] = 1;
            }
            this.countArray[i] += 1; 
        }
        }
    }

    less( position:number ): void {
        for (let i = 0; i < this.countArray.length; i++) {
        if (i === position) {
            this.countArray[i] -= 1; 
        }
        }
    }

    valid( position:number ): boolean {
        for (let i = 0; i < this.countArray.length; i++) {
        if (i === position) {
            if (this.countArray[i] < 1) {
            return true; 
            } else {
            return false;
            }
        }
        }
        return false;
    }

    add( position:number ): void {
        for (let i = 0; i < this.products.length; i++) {
        if (i === position) {
            this.validCountArray(i);
            this.qProduct = {
                id: this.products[i].id,
                quantity: this.countArray[i]
            }
            this.shoppingCart.push(this.qProduct);
            localStorage.setItem('shoppingCart', JSON.stringify(this.shoppingCart));
            this.qProduct = {
                id: 0,
                quantity: 0
            }
            this.countArray[i] = 1;
        }
        }
    }

    validCountArray( i:number ): void {
        if (this.countArray[i] === 0) {
            this.countArray[i] = 1;
        }
    }

    search( name: string ) {
        this.displaySuggestions = false;
        this.mistakes = false;
        this.word = name;

        if (this.currentRoute === '/main/fruits') {
            this.productService.getByNameFruit(name).subscribe( (fruits) => {
                this.products = fruits.result.content;
                if (this.products.length === 0) {
                    this.mistakes = true;
                }
            });
        } else if (this.currentRoute === '/main/juices') {
            this.productService.getByNameJuice(name).subscribe( (fruits) => {
                this.products = fruits.result.content;
                if (this.products.length === 0) {
                    this.mistakes = true;
                }
            });
        }
    }

    suggestion( name: string ) {
        this.mistakes = false;
        this.word = name;
        this.displaySuggestions = true;

        if (this.currentRoute === '/main/fruits') {
            this.productService.getByNameFruit(name).subscribe( (fruits) => {
                fruits = fruits.result.content;
                this.productsSuggested = fruits.splice(0, 3)      
            });
        } else if (this.currentRoute === '/main/juices') {
            this.productService.getByNameJuice(name).subscribe( (juices) => {
                juices = juices.result.content;
                this.productsSuggested = juices.splice(0, 3)      
            });
        }
    }
    
    searchSuggested( name: string ) {
        this.search(name);
    }

    color(i: number): string {
        if (i % 2 == 0) {
        return 'button__pair';
        } return 'button__odd';
    }
}