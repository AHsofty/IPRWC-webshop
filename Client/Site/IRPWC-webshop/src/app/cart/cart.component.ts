import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "../cart-item/cart-item.component";
import {CartService} from "../shared/service/cart.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  protected readonly CartService = CartService;
  total_price: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.loadItems();
    this.total_price = this.cartService.getTotalPrice();
  }


}
