import { Routes } from '@angular/router';
import {App} from './app';
import {Login} from './authentication/login/login';
import {Register} from './authentication/register/register';
import {Main} from './general/components/main/main';
import {RegisterProcess} from './authentication/register/register-process/register-process';
import {PasswordReset} from './authentication/password-reset/password-reset';
import {CustomerDashboard} from './customer/customer-dashboard/customer-dashboard';
import {Profile} from './customer/profile/profile';
import {CustomerRestaurantList} from './customer/customer-restaurant-list/customer-restaurant-list';
import {RestaurantDashboard} from './restaurant/restaurant-dashboard/restaurant-dashboard';
import {RestaurantProductList} from './restaurant/restaurant-product-list/restaurant-product-list';
import {RestaurantOrderList} from './restaurant/restaurant-order-list/restaurant-order-list';
import {MainMenu} from './general/components/main-menu/main-menu';
import {RestaurantNewProduct} from './restaurant/restaurant-new-product/restaurant-new-product';

export const routes: Routes = [
  { path: '', component: Main },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'passwordReset', component: PasswordReset },
  { path: 'register/:userRole', component: RegisterProcess },
  { path: 'mainmenu', component: MainMenu },

  { path: 'customer',
    component: MainMenu,
    children: [
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: CustomerRestaurantList },
      { path: 'dashboard', component: CustomerDashboard },
      { path: 'profile', component: Profile }
    ]},

  { path: 'restaurant',
    component: MainMenu,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: RestaurantDashboard },
      { path: 'orders', component: RestaurantOrderList },
      { path: 'products', component: RestaurantProductList },
      { path: 'profile', component: Profile },
      { path: 'newProduct', component: RestaurantNewProduct },
    ]},


];
