import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from "../shared/service/api.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../shared/service/cart.service";
import {Product} from "../product.model";
import {ImagehandlerService} from "../imagehandler";

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

  constructor(private apiService: ApiService, private route: ActivatedRoute, private cart: CartService, private imageHandler: ImagehandlerService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.uuid = params['id']; // Save the UUID from the URL
    });

    this.getProduct();
  }


  addToCart(product: Product | undefined) {
    if (product != undefined) {
      CartService.add(product);
    }
  }

  private getProduct() {
    this.apiService.getProductById(this.uuid).subscribe({next:(payload) => {
        this.product = payload;
        this.imageHandler.handleMainImage(this.product).subscribe();
        this.backgroundImageSting = this.product.images[0].imageUrl!!;
      }});
  }


}
