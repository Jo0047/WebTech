import { Routes } from '@angular/router';
import {App} from './app';
import {Login} from './authentication/login/login';
import {Register} from './authentication/register/register';
import {Main} from './main/main';
import {RegisterProcess} from './authentication/register/register-process/register-process';
import {PasswordReset} from './authentication/password-reset/password-reset';

export const routes: Routes = [
  { path: '', component: Main },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'passwordReset', component: PasswordReset },
  { path: 'register/:userRole', component: RegisterProcess },

  //{
   // path: 'dashboard',
    //component: DashboardComponent,
    //canActivate: [AuthGuard]  // Protected route
  //}
];
