import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {UserRole} from '../../../models/user-role';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationData} from '../../../models/user-data';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-register-process',
  imports: [
    ReactiveFormsModule,
    MatStepper,
    MatStep,
    MatStepperNext,
    MatInput,
    MatStepLabel,
    MatStepperPrevious,
  ],
  templateUrl: './register-process.html',
  styleUrl: './register-process.css',
})

export class RegisterProcess {

  private activatedRoute = inject(ActivatedRoute);
  protected readonly UserRole = UserRole;

  userRole = UserRole.restaurant
  isLinear = true;
  authService = inject(AuthenticationService);
  passwordMismatchError = false;

  basicInfoForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', Validators.required),
  });

  addressForm = new FormGroup({
    street: new FormControl('', Validators.required),
    streetNumber: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', [Validators.required]),
  });

  restaurantForm = new FormGroup({
    restaurantName: new FormControl('', Validators.required),
    restaurantEmail: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe((params) => {      // Access route parameters
      this.userRole = params['userRole'];
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.basicInfoForm.valid && this.addressForm.valid
        && !((this.restaurantForm.valid || (this.userRole == UserRole.restaurant))
        && !(this.restaurantForm.valid && (this.userRole == UserRole.restaurant)))
      ) {
      const basicInfoFormValue = this.basicInfoForm.value;
      const addressFormValue = this.addressForm.value;
      const restaurantFormValue = this.restaurantForm.value;

      if (basicInfoFormValue.password !== basicInfoFormValue.confirmPassword) {
        this.passwordMismatchError = true;
        console.log('Password missmatch!');
        return;
      }

      const registrationData = new RegistrationData(
        basicInfoFormValue.firstname!,
        basicInfoFormValue.lastname!,
        basicInfoFormValue.email!,
        basicInfoFormValue.password!,
        addressFormValue.street!,
        Number(addressFormValue.streetNumber!),
        addressFormValue.city!,
        Number(addressFormValue.zipCode!),
        this.userRole === UserRole.restaurant ? restaurantFormValue.restaurantName! : undefined,
        this.userRole === UserRole.restaurant ? restaurantFormValue.restaurantEmail! : undefined,
        this.userRole === UserRole.restaurant ? restaurantFormValue.phoneNumber! : undefined,
      );

      console.log(registrationData);

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.router.navigate(['/login'], {
            state: {
              registrationSuccess: true,
              message: 'Registration successful! Please log in with your credentials.'
            }
          });
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            alert(error.error.message);
          } else {
            alert('Registration failed. Please try again.');
          }
        }
      });

    } else {
      console.log('Registration failed - form is invalid');
    }
  }

  /**
   * Helper method to check if a field has an error
   */
  hasError(form: FormGroup, fieldName: string, errorType: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.hasError(errorType) && (field.dirty || field.touched));
  }

}
