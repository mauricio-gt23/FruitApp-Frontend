import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from "../interfaces/item.interface";

const SHOPPING_CART = 'shoppingCart';

@Injectable({
    providedIn: 'root'
  })
export class LocalStorageService {

  private shoppingCartSubject = new BehaviorSubject<Item[]>([]);
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

  addToShoppingCart( item: Item ): void {
    try {
      const currentShoppingCart = this.getShoppingCart();
      localStorage.setItem(SHOPPING_CART, JSON.stringify([...currentShoppingCart, item]));
      this.shoppingCartSubject.next([...currentShoppingCart, item]);
    } catch (error) {
      console.log("Error saving localStorage", error);
      alert("Error");
    }
  }

  removeFromShoppingCart( position:number ): void {
    try {
      const currentsShoppingCart = this.getShoppingCart();
      currentsShoppingCart.splice(position, 1);
      localStorage.setItem(SHOPPING_CART, JSON.stringify([...currentsShoppingCart]));
      this.shoppingCartSubject.next([...currentsShoppingCart]);
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