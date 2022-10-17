import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from "../interfaces/product.interface";
import { QuantityProduct } from "../interfaces/quantity-product.interface";

const SHOPPING_CART = 'shoppingCart';

@Injectable({
    providedIn: 'root'
  })
export class LocalStorageService {

  private shoppingCartSubject = new BehaviorSubject<QuantityProduct[]>([]);
  shoppingCart$ = this.shoppingCartSubject.asObservable();

  constructor() {
    this.initialStorage();
  }

  initialStorage(): void {
    const currentShoppingCart = JSON.parse(localStorage.getItem(SHOPPING_CART)!);
    if (!currentShoppingCart) {
      localStorage.setItem(SHOPPING_CART, JSON.stringify([]));
    }
    this.getShoppingCart();
  }

  getShoppingCart(): any {
    try {
      const shoppingCart = JSON.parse(localStorage.getItem(SHOPPING_CART)!);
      this.shoppingCartSubject.next(shoppingCart);
      return shoppingCart;
    } catch (error) {
      console.log("Error getting shoppingCart from localStorage", error);
    }
  }

  addToShoppingCart( qProduct: QuantityProduct ): void {
    try {
      const currentShoppingCart = this.getShoppingCart();
      localStorage.setItem(SHOPPING_CART, JSON.stringify([...currentShoppingCart, qProduct]));
      this.shoppingCartSubject.next([...currentShoppingCart, qProduct]);
    } catch (error) {
      console.log("Error saving localStorage", error);
      alert("Error");
    }
  }

  removeFromShoppingCart( id:number ): void {
    try {
      const currentsShoppingCart = this.getShoppingCart();
      const products = currentsShoppingCart.filter((item: { id: any; }) => item.id !== id);
      localStorage.setItem(SHOPPING_CART, JSON.stringify([...products]));
      this.shoppingCartSubject.next([...products]);
    } catch (error) {
      console.log("Error removing localStorage", error);
      alert("Error");
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log("Error cleaning localStorage", error);
    }
  }

}