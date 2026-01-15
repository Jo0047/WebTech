import { Routes } from '@angular/router';
import {App} from './app';
import {Login} from './authentication/login/login';
import {Register} from './authentication/register/register';
import {Main} from './main/main';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'login', component: Login },
  { path: 'register', component: Register }
  //{
   // path: 'dashboard',
    //component: DashboardComponent,
    //canActivate: [AuthGuard]  // Protected route
  //}
];
