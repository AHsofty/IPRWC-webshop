import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCardComponent} from "../item-card/item-card.component";
import {ApiService} from "../shared/service/api.service";
import {Product} from "../product.model";
import {ImagehandlerService} from "../shared/service/imagehandler";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AdminOption} from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ItemCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  public productsV2: Product[] = [];
  constructor(private apiService: ApiService, private imageHandler: ImagehandlerService) {
  }

  ngOnInit() {
    this.loadProducts();
  }


  loadProducts() {
    this.apiService.getAllProducts()
      .subscribe({
        next: (data) => {
          this.productsV2 = data;
          for (let product of this.productsV2) {
            this.imageHandler.handleMainImage(product).subscribe();
          }
        }
      });
  }



}
