import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SideBarMenu} from '../../general/components/side-bar-menu/side-bar-menu';

@Component({
  selector: 'app-restaurant-main',
  imports: [
    RouterOutlet,
    SideBarMenu
  ],
  templateUrl: './restaurant-main.html',
  styleUrl: './restaurant-main.css',
})
export class RestaurantMain {
  isMenuOpen = false;
  user = "Mustermann"; // Todo general from login

  restaurantMenu = [
    {
      routelink: '/restaurant/dashboard',
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
    },
    {
      routelink: '/restaurant/orders',
      label: 'Orders',
      icon: 'fa-solid fa-receipt',
    },
    {
      routelink: '/restaurant/products',
      label: 'Menu',
      icon: 'fa-solid fa-list',
    },
    {
      routelink: '/restaurant/profile',
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
