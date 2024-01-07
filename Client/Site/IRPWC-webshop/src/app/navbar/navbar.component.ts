import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {AdminOption} from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {

  }


  onDashboardClick() {
    AdminOption.reset();
    this.router.navigate(['/dashboard']);
  }
}
