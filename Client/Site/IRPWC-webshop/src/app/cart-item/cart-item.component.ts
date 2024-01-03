import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Product} from "../product.model";

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() product: Product | undefined;
  public imageString: string = ""

  ngOnInit() {
    this.setImageString();
  }

  setImageString() {
    this.imageString = this.product?.images[0].imageUrl!!;
    console.log(this.imageString)
  }



}
