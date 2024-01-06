import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {CreateitemsComponent} from "./createitems/createitems.component";
import {ProductViewComponent} from "./product-view/product-view.component";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";
import {loginGuard} from "./shared/guard/login.guard";
import {authGuard} from "./shared/guard/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {adminGuard} from "./shared/guard/admin.guard";
import {LogoutComponent} from "./logout/logout.component";
import {UpdateProductComponent} from "./update-product/update-product.component";


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
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
        canActivate: [adminGuard],
      },
      {
        path: 'product/:id',
        component: ProductViewComponent,
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [authGuard],
      },
      {
        path: 'product/edit/:id',
        component: UpdateProductComponent,
        canActivate: [adminGuard],
      }
    ],
  },
];
