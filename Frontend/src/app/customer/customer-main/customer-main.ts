import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarMenu } from '../../general/components/side-bar-menu/side-bar-menu';

@Component({
  selector: 'app-customer-main',
  imports: [
    RouterOutlet,
    SideBarMenu
  ],
  templateUrl: './customer-main.html',
  styleUrl: './customer-main.css',
})
export class CustomerMain {
  isMenuOpen = false;
  user = "Mustermann"; // Todo get from login

  customerMenu = [
    {
      routelink: '/customer/restaurants',
      label: 'Home',
      icon: 'fa-solid fa-utensils',
    },
    {
      routelink: '/customer/dashboard',
      label: 'Orders',
      icon: 'fa-solid fa-basket-shopping',
    },
    {
      routelink: '/customer/profile',
      label: 'Profile',
      icon: 'fa-solid fa-user',
    }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Prevent body scroll when menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }
}
