import { Injectable } from '@angular/core';
import {AuthResponse} from '../models/user-data';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {

  private _currentUser: AuthResponse | null = null;

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser != null) {
      this._currentUser = JSON.parse(storedUser);
    }
  }

  getCurrentUser(): AuthResponse | null {
    return this._currentUser;
  }

  getIsOwner(): boolean {
    return this._currentUser?.isOwner || false;
  }

  getEmail(): string | null {
    return this._currentUser?.email || null;
  }

}
