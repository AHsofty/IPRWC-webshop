import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCardComponent} from "../item-card/item-card.component";
import {ApiService} from "../shared/service/api.service";
import {Product} from "../product.model";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  public products: Product[] = [];

  constructor(private apiService: ApiService, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiService.getAllProducts()
      .subscribe({
        next: (data) => {
          this.products = data;

          let localProducts: Product[] = [];
          for (let product of this.products) {
            console.log(product.image);
            product.image = ('data:image/jpg;base64,' + product.image);
            localProducts.push(product);
          }

          this.products = localProducts;
        }
      });
  }

}
