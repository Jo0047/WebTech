import { Routes } from '@angular/router';
import {App} from './app';
import {Login} from './authentication/login/login';
import {Register} from './authentication/register/register';
import {Main} from './general-components/main/main';
import {RegisterProcess} from './authentication/register/register-process/register-process';
import {PasswordReset} from './authentication/password-reset/password-reset';
import {CustomerDashboard} from './customer/customer-dashboard/customer-dashboard';
import {Profile} from './general-components/profile/profile';
import {CustomerRestaurantList} from './customer/customer-restaurant-list/customer-restaurant-list';
import {RestaurantDashboard} from './restaurant/restaurant-dashboard/restaurant-dashboard';
import {RestaurantProductList} from './restaurant/restaurant-product-list/restaurant-product-list';
import {RestaurantOrderList} from './restaurant/restaurant-order-list/restaurant-order-list';
import {MainMenu} from './general-components/main-menu/main-menu';
import {authGuard} from './services/auth/auth-guard';
import {RestaurantNewProduct} from './restaurant/restaurant-new-product/restaurant-new-product';
import {CustomerRestaurantBasket} from './customer/customer-restaurant-basket/customer-restaurant-basket';
import {NewPassword} from './authentication/password-reset/new-password/new-password';
import {CustomerCheckout} from './customer/customer-checkout/customer-checkout';
import {RestaurantEditProduct} from './restaurant/restaurant-edit-product/restaurant-edit-product';

export const routes: Routes = [
  { path: '', component: Main },

  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'passwordReset', component: PasswordReset },
  { path: 'register/:userRole', component: RegisterProcess },
  { path: 'mainmenu', component: MainMenu,canActivate: [authGuard]},
  { path: 'newPassword', component: NewPassword},

  { path: 'customer',
    component: MainMenu,
    children: [
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: CustomerRestaurantList },
      { path: 'dashboard', component: CustomerDashboard },
      { path: 'profile', component: Profile },
      { path: 'checkout', component: CustomerCheckout},
      { path: ':restaurantName', component: CustomerRestaurantBasket},
    ],
    canActivate: [authGuard]
  },

  { path: 'restaurant',
    component: MainMenu,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: RestaurantDashboard },
      { path: 'orders', component: RestaurantOrderList },
      { path: 'products', component: RestaurantProductList },
      { path: 'profile', component: Profile },
      { path: 'newProduct', component: RestaurantNewProduct },
      {path : 'editProduct/:id', component: RestaurantEditProduct },
    ],
    canActivate: [authGuard]
  },


];
