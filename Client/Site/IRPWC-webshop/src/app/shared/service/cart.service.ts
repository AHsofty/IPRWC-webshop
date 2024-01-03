import {Injectable} from "@angular/core";
import {Product} from "../../product.model";
import {ApiService} from "./api.service";
import {ProductV2} from "../../productv2.model";

@Injectable()
export class CartService {
  public static items: ProductV2[] = [];

  constructor(private apiService: ApiService) {
  }

  loadItems() {
    CartService.items = [];
    CartService.items = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getItems(): ProductV2[] {
    return CartService.items;
  }

  remove(product: ProductV2): void {
    CartService.items.splice(CartService.items.indexOf(product), 1);

    localStorage.setItem('cart', JSON.stringify(CartService.items));
  }


  static add(product: ProductV2) {
    CartService.items.push(product);

    localStorage.setItem('cart', JSON.stringify(CartService.items));
  }

  public static clear() {
    CartService.items = [];
    localStorage.setItem('cart', JSON.stringify(CartService.items));
  }


}
