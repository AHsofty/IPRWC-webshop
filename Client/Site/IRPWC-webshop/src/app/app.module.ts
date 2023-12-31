import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LucideAngularModule, icons } from 'lucide-angular';
import { routes } from './app.routes';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ApiService } from './shared/service/api.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import {CartService} from "./shared/service/cart.service";
import {AuthService} from "./shared/service/auth.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NavbarComponent,
    RouterModule.forRoot(routes),
    LucideAngularModule.pick(icons),
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [HttpClientModule, ApiService, CartService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
