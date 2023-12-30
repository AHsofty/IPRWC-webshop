import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {CreateitemsComponent} from "./createitems/createitems.component";
import {ProductViewComponent} from "./product-view/product-view.component";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateitemsComponent,
      },
      {
        path: 'product/:id',
        component: ProductViewComponent,
      },
      {
        path: 'cart',
        component: CartComponent
      }

    ],
  },
];
