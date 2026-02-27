import {ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {MainMenuService} from '../../services/main-menu.service';
import {AuthResponse} from '../../models/user-data';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  authService = inject(AuthenticationService);
  private cdr = inject(ChangeDetectorRef);

  loginError = signal('')
  successMessage: string = '';

  constructor(
    private router: Router,
  ) {
    if (window.history.state.registrationSuccess) {
      this.successMessage = window.history.state.message || 'Registration successful!';
    }

    if (window.history.state.passwordResetSuccess) {
      this.successMessage = window.history.state.message || 'Password reset successful!';
    }

  }

  /**
   * Handle form submission
   */
  onSubmit(): void {

    this.loginError.set('')
    this.successMessage = '';  // Clear success message on login attempt

    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      this.authService.handleLogin(formValue.email?.toString(), formValue.password?.toString()).subscribe({
        next: (response: AuthResponse) => {
          this.router.navigate(['/mainmenu']);
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            this.loginError.set(error.error.message);
          } else {
            console.log(error.status);
            this.loginError.set('Login failed. Please try again.');
          }

          this.cdr.detectChanges();
        }
      });

    } else {
      console.log('Login failed - form is invalid');
      this.cdr.detectChanges();
    }
  }

  /**
   * Helper method to check if a field has an error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
  }

  navigateToRegister(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  protected navigateToPasswordReset(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/passwordReset']);
  }
}
