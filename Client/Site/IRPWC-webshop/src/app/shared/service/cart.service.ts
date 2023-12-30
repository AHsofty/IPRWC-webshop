import {Injectable} from "@angular/core";
import {Product} from "../../product.model";

@Injectable()
export class CartService {
  public static items: Product[] = [];

  constructor() {
  }

  loadItems() {
    CartService.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getItems(): Product[] {
    return CartService.items;
  }

  remove(product: Product): void {
    CartService.items.splice(CartService.items.indexOf(product), 1);
    localStorage.setItem('cart', JSON.stringify(CartService.items));
  }

  static add(product: Product) {
    CartService.items.push(product);
    localStorage.setItem('cart', JSON.stringify(CartService.items));
    console.log(CartService.items)
  }
}
