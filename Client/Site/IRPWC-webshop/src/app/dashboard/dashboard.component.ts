import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCardComponent} from "../item-card/item-card.component";
import {ApiService} from "../shared/service/api.service";
import {Product} from "../product.model";
import {DomSanitizer} from '@angular/platform-browser';
import {Image} from "../image.model";
import {ProductV2} from "../productv2.model";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  public productsV2: ProductV2[] = [];

  constructor(private apiService: ApiService, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadProductsV2();
  }


  loadProductsV2() {
    this.apiService.getAllProductsV2()
      .subscribe({
        next: (data) => {
          this.productsV2 = data;
          for (let product of this.productsV2) {
            this.processProductImages(product);
          }
          console.log(this.productsV2)
        }
      });
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
    }
  }

}
