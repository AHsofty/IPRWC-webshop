import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";


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

  constructor(private router: Router) {}

  onViewClick() {
    this.router.navigate(['/product', this.productID]);
  }
}
