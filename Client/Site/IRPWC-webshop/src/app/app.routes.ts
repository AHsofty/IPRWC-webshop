import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import {CreateitemsComponent} from "./createitems/createitems.component";
import {ProductViewComponent} from "./product-view/product-view.component";


export const routes: Routes = [
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
      }
    ],
  },
];
