import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../product.model";
import {ApiService} from "../shared/service/api.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../shared/service/cart.service";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  public product: Product | undefined = undefined;

  private uuid: string = "";
  private routeSub: Subscription = new Subscription();

  public backgroundImageSting: string = "";

  constructor(private apiService: ApiService, private route: ActivatedRoute, cart: CartService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.uuid = params['id']; // Save the UUID from the URL
    });

    this.getProduct();
  }

  getProduct() {
    this.apiService.getProductById(this.uuid).subscribe({next:(payload) => {
        this.product = new Product(payload.id
          , payload.productName
          , payload.buyPrice
          , payload.sellPrice
          , payload.quantity
          , payload.description
          , payload.image);

        this.backgroundImageSting = "data:image/jpg;base64," + this.product?.image;

      }});

  }

  protected readonly undefined = undefined;

  addToCart(product: Product | undefined) {
    if (product != undefined) {
      CartService.add(product);
    }
  }
}
