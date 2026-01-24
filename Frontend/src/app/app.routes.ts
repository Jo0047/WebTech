import { Routes } from '@angular/router';
import {App} from './app';
import {Login} from './authentication/login/login';
import {Register} from './authentication/register/register';
import {Main} from './general/components/main/main';
import {RegisterProcess} from './authentication/register/register-process/register-process';
import {PasswordReset} from './authentication/password-reset/password-reset';
import {CustomerMain} from './customer/customer-main/customer-main';
import {CustomerDashboard} from './customer/customer-dashboard/customer-dashboard';
import {Profile} from './customer/profile/profile';
import {CustomerRestaurantList} from './customer/customer-restaurant-list/customer-restaurant-list';
import {RestaurantMain} from './restaurant/restaurant-main/restaurant-main';
import {RestaurantDashboard} from './restaurant/restaurant-dashboard/restaurant-dashboard';
import {RestaurantProcessOrder} from './restaurant/restaurant-process-order/restaurant-process-order';
import {RestaurantProductList} from './restaurant/restaurant-product-list/restaurant-product-list';

export const routes: Routes = [
  { path: '', component: Main },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'passwordReset', component: PasswordReset },
  { path: 'register/:userRole', component: RegisterProcess },

  { path: 'customer',
    component: CustomerMain,
    children: [
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: CustomerRestaurantList },
      { path: 'dashboard', component: CustomerDashboard },
      { path: 'profile', component: Profile }
    ]},

  { path: 'restaurant',
    component: RestaurantMain,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: RestaurantDashboard },
      { path: 'orders', component: RestaurantProcessOrder },
      { path: 'products', component: RestaurantProductList },
      { path: 'profile', component: Profile }
    ]},


];
