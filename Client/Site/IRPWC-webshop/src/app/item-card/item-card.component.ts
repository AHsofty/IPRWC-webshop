import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {ApiService} from "../shared/service/api.service";
import {AuthService} from "../shared/service/auth.service";
import {Product} from "../product.model";
import {AdminOption} from "../navbar-admin/navbar-admin.component";


@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss'
})
export class ItemCardComponent {
  @Input() productImage: string = "../../assets/couche.jpg";
  @Input() productName: string = "Place holder";
  @Input() productSellPrice: number = 0;
  @Input() productDescription: string = "place holder";
  @Input() productID: string = "place holder";
  @Input() productBuyPrice: number = 0;
  @Input() productQuantity: number = 0;
  public isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService, private apiService: ApiService) {
    this.isAdmin = this.authService.isAdmin();
  }

  onViewClick() {
    this.router.navigate(['/product', this.productID]);
  }

  onEditClick() {
    this.router.navigate(['/product/edit', this.productID]);
  }

  onRemoveClick() {
    this.apiService.deleteProductById(this.productID).subscribe((data) => {
      window.location.reload();
    });
  }

  protected readonly AdminOption = AdminOption;
}
