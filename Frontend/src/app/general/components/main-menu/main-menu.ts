import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {SideBarMenu} from "../side-bar-menu/side-bar-menu";
import {MainMenuService} from '../../services/main-menu.service';

@Component({
  selector: 'app-main-menu',
    imports: [
        RouterOutlet,
        SideBarMenu
    ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.css',
})
export class MainMenu {
  isMenuOpen = false;
  mainMenuService = inject(MainMenuService);

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

  constructor(
    private router: Router
  ){
    if (this.mainMenuService.getIsOwner()) {
      this.router.navigate(['/restaurant/dashboard']);
    } else {
      this.router.navigate(['/customer/restaurants']);
    }
  }

  menuItems() {
    return this.mainMenuService.getIsOwner() ? this.restaurantMenu : this.customerMenu;
  }

  showCart(){
    //Todo
  }

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
