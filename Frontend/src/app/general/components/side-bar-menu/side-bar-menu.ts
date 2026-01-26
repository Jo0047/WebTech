import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

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
  authService = inject(AuthenticationService);

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
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
