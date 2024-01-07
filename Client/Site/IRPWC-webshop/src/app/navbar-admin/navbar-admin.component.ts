import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar-admin.component.html',
  styleUrl: '../navbar/navbar.component.scss'
})
export class NavbarAdminComponent {
  constructor(private router: Router) {

  }

  onRemoveClick() {
    AdminOption.isDelete = true;
    AdminOption.isEdit = false;
    this.router.navigate(['/dashboard']);
  }

  onEditClick() {
    AdminOption.isEdit = true;
    AdminOption.isDelete = false;
    this.router.navigate(['/dashboard']);
  }

}

export class AdminOption {
  public static isEdit: boolean = false;
  public static isDelete: boolean = false;

  public static reset() {
    AdminOption.isEdit = false;
    AdminOption.isDelete = false;
  }
}
