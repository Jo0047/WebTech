import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-side-bar-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-bar-menu.html',
  styleUrl: './side-bar-menu.css',
})
export class SideBarMenu {
  @Input() isMenuOpen = false;
  @Output() menuClosed = new EventEmitter<void>();

  items = [
    {
      routelink: '/customer/restaurants',
      label: 'Home',
      icon: 'fa-solid fa-utensils',
      isActive: true
    },
    {
      routelink: '/customer/dashboard',
      label: 'Orders',
      icon: 'fa-solid fa-basket-shopping',
      isActive: false
    },
    {
      routelink: '/customer/profile',
      label: 'Profile',
      icon: "fa-solid fa-user",
      isActive: false
    }
  ];



  constructor(private router: Router) {}

  closeMenu(): void {
    this.menuClosed.emit();
  }

  logout(): void {
    this.closeMenu();
    this.router.navigate(['']);
  }
}
