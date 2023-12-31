import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {

  constructor(private router: Router) { }

  ngOnInit() {
    this.logout()
  }

  logout() {
    sessionStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
