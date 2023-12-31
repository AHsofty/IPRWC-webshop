import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {CreateitemsComponent} from "./createitems/createitems.component";
import {ProductViewComponent} from "./product-view/product-view.component";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";
import {loginGuard} from "./shared/guard/login.guard";
import {authGuard} from "./shared/guard/auth.guard";


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
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
        canActivate: [authGuard],
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
