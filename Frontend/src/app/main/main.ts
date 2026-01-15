import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

  constructor(private router: Router) {}

  /**
   * Navigate to the login page
   */
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigate to the register page
   */
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
