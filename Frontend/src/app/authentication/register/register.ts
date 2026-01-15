import {Component, inject} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../auth-service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),
  });
  authService = inject(AuthService);
  passwordMismatchError = false;

  constructor(
    private router: Router
  ) {}

  /**
   * Helper method to check if a field has an error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      if (formValue.password !== formValue.confirmPassword) {
        this.passwordMismatchError = true;
        console.log('Password missmatch!');
        return;
      }

      console.log('Registration attempt with:', {
        fullName: formValue.name,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
      });

      // TODO: Implement actual registration logic here
      // todo if succesful redirect to dashboard
      this.authService.registerUser(); //<- um parameter erweitern z.B formvalue.name, etc...
    } else {
      console.log('Registration failed - form is invalid');
    }
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

}
