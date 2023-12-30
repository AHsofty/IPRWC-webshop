import {Injectable} from "@angular/core";
import {Product} from "../../product.model";
import {ApiService} from "./api.service";

@Injectable()
export class CartService {
  public static items: Product[] = [];
  public static itemUUIDs: string[] = [];

  constructor(private apiService: ApiService) {
  }

  loadItems() {
    CartService.items = [];
    CartService.itemUUIDs = [];

    CartService.itemUUIDs = JSON.parse(localStorage.getItem('cart') || '[]');
    for (let uuid of CartService.itemUUIDs) {
      this.apiService.getProductById(uuid).subscribe({next:(payload) => {
          let product: Product = new Product(payload.id
            , payload.productName
            , payload.buyPrice
            , payload.sellPrice
            , payload.quantity
            , payload.description
            , payload.image);
          CartService.items.push(product);
        }});
    }

  }

  getItems(): Product[] {
    return CartService.items;
  }

  remove(product: Product): void {
    CartService.items.splice(CartService.items.indexOf(product), 1);
    CartService.itemUUIDs.splice(CartService.itemUUIDs.indexOf(product.id), 1);

    localStorage.setItem('cart', JSON.stringify(CartService.itemUUIDs));
  }

  static add(product: Product) {
    CartService.items.push(product);
    CartService.itemUUIDs.push(product.id)

    localStorage.setItem('cart', JSON.stringify(CartService.itemUUIDs));
    console.log(CartService.items)
  }

  public static clear() {
    CartService.items = [];
    CartService.itemUUIDs = [];

    localStorage.setItem('cart', JSON.stringify(CartService.itemUUIDs));
  }


}
