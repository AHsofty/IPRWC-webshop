import {Injectable} from "@angular/core";
import {Product} from "../../product.model";

@Injectable()
export class CartService {
  public static items: Product[] = [];

  constructor() {
  }


  remove(product: Product): void {
    CartService.items.splice(CartService.items.indexOf(product), 1);
  }

  static add(product: Product) {
    CartService.items.push(product);
    console.log(CartService.items)
  }
}
