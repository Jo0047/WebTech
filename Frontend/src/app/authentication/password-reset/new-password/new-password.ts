import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/auth/authentication.service';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-new-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInput
  ],
  templateUrl: './new-password.html',
  styleUrl: './new-password.css',
})
export class NewPassword {
  newPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),

  })
  authService = inject(AuthenticationService);
  passwordMismatchError = false;
  isValidToken = false;
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.token = params['token'];
        this.authService.verifyResetToken(params['token']).subscribe({
          next: (response) => {
            console.log('Token is valid:', response);
            this.isValidToken = true;
          },
          error: (error) => {
            console.error('Token verification failed:', error);
            this.isValidToken = false;
          }
        });

      }
    });

  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      const formValue = this.newPasswordForm.value;

      if (formValue.password !== formValue.confirmPassword) {
        this.passwordMismatchError = true;
        console.log('Password missmatch!');
        return;
      }

      this.authService.resetPassword(this.token,formValue.confirmPassword!).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/login'], {
            state: {
              passwordResetSuccess: true,
              message: 'The password was successfully reset!'
            }
          });
        },
        error: (error) => {
          console.log('Error:', error);
          this.router.navigate(['/login'], {
            state: {
              passwordResetSuccess: true,
              message: 'Couldnt reset your password'
            }
          });
        }
      })

    } else {
      console.log('Password Reset failed - form is invalid');
    }
  }

  /**
   * Helper method to check if a field has an error
   */
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.newPasswordForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
  }

  navigateToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
