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
