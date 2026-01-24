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

  @Input() items: {
    routelink: string;
    label: string;
    icon: string;
  }[] = [];

  constructor(private router: Router) {}

  closeMenu(): void {
    this.menuClosed.emit();
  }

  logout(): void {
    this.closeMenu();
    this.router.navigate(['']);
  }
}
