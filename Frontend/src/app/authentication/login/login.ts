import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../general/services/auth/authentication.service';
import {MainMenuService} from '../../general/services/main-menu.service';
import {AuthResponse} from '@models/user-data';

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
  mainMenuService = inject(MainMenuService);

  constructor(
    private router: Router,
  ) {}

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      console.log('Login attempt with:', {
        email: formValue.email,
        password: formValue.password,
      });

      this.authService.handleLogin(formValue.email?.toString(), formValue.password?.toString()).subscribe({
        next: (response: AuthResponse) => {
          console.log('Success:', response);
          this.mainMenuService.setEmail(response.email)
          this.mainMenuService.setIsOwner(response.isOwner)
          this.router.navigate(['/mainmenu']);
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            alert(error.error.message);
          } else {
            alert('Login failed. Please try again.');
          }
        }
      });

      //todo redirect zu dashboard wenn erfolgreich, sonst error
      //todo basierend auf is_owner userRole festelgen und zum "Main" screen navigieren und Sidebar/(Warenkorb) dementsprechend anzeigen.
    } else {
      console.log('Login failed - form is invalid');
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
