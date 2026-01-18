import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from '../auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './password-reset.html',
  styleUrl: './password-reset.css',
})
export class PasswordReset {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  authService = inject(AuthService);

  constructor(
    private router: Router,
  ) {}

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      console.log('Reset attempt with:', {
        email: formValue.email,
      });

      //todo email für passwort reset senden

    } else {
      console.log('Password Reset failed - form is invalid');
    }
  }

  /**
   * Helper method to check if a field has an error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
