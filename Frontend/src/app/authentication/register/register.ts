import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { UserRole } from '../../models/user-role';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  protected readonly UserRole = UserRole;

  constructor(
    private router: Router
  ) {}

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  selectUserType(role: UserRole): void {
    this.router.navigate(['/register', role.toString()]);
  }

}
