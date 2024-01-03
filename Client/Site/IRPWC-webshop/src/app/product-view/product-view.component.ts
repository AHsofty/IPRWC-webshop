import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../product.model";
import {ApiService} from "../shared/service/api.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../shared/service/cart.service";
import {ProductV2} from "../productv2.model";
import {Image} from "../image.model";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  public product: ProductV2 | undefined = undefined;

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

  addToCart(product: Product | undefined) {
    if (product != undefined) {
      CartService.add(product);
    }
  }

  private getProduct() {
    this.apiService.getProductByIdV2(this.uuid).subscribe({next:(payload) => {
        this.product = payload;

        this.processProductImages(this.product);
      }});
  }

  processProductImages(product: ProductV2) {
    if (product.images && Array.isArray(product.images)) {
      for (let image of product.images) {
        this.processImage(image);
      }
    }
  }

  processImage(image: Image) {
    if (image.imageName == "main") {
      this.apiService.getImageById(image.id)
        .subscribe({
          next: (blob) => {
            this.handleImageResponse(blob, image);
          }
        });
    }
  }

  handleImageResponse(blob: Blob, image: Image) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      let base64data = reader.result;
      image.imageBase64 = base64data as string;
      this.backgroundImageSting = image.imageBase64;
    }
  }
}
