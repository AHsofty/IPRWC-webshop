import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItemComponent} from "../cart-item/cart-item.component";
import {CartService} from "../shared/service/cart.service";
import {ApiService} from "../shared/service/api.service";
import {AuthService} from "../shared/service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Product} from "../product.model";

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

  constructor(private cartService: CartService, private apiService: ApiService, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.cartService.loadItems();
    this.total_price = this.cartService.getTotalPrice();
  }


  clear() {
    this.total_price = 0;
    CartService.clear();
  }

  buy() {
    if (!this.authService.isAuthenticated()) {
      this.toastr.error("You need to be logged in to buy products", "Error");
      return;
    }

    let token = this.authService.getToken();
    let users = [];
    for (var i of this.cartService.getItems()) {
      users.push(i.id);
    }

    this.apiService.makeOrder(token!!, users).subscribe(
      response => {
        this.toastr.success("You have successfully bought the products", "Success");
        CartService.clear();
        this.total_price = 0;
        },
      error => {
        this.toastr.error("Something went wrong while buying the products", "Error");
      }
    );

  }
}
