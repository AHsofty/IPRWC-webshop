import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Product} from "../../product.model";

@Injectable()
export class CartService {
  public static items: Product[] = [];

  constructor(private apiService: ApiService) {
  }

  loadItems() {
    CartService.items = [];
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
  }

  public static clear() {
    CartService.items = [];
    localStorage.setItem('cart', JSON.stringify(CartService.items));
  }


  getTotalPrice() {
    let total = 0
    for (let item of CartService.items) {
      total += item.buyPrice;
    }
    return total
  }
}
