import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

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
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  authService = inject(AuthenticationService);
  emailSent = false;

  constructor(
    private router: Router,
  ) {}

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.resetForm.valid) {
      const formValue = this.resetForm.value;

      console.log('Reset attempt with:', {
        email: formValue.email,
      });

      this.authService.requestPasswordReset(formValue.email).subscribe(data => {
        console.log(data);
        this.emailSent = true;
      });

    } else {
      console.log('Password Reset failed - form is invalid');
    }
  }

  /**
   * Helper method to check if a field has an error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.resetForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
