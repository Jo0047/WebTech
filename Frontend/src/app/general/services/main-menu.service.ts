import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainMenuService {
  private email: any = undefined;
  private isOwner: boolean = false;

  constructor() {}

  setEmail(email: any) {
    this.email = email;
  }

  setIsOwner(isOwner: any) {
    this.isOwner = isOwner;
  }

  getIsOwner() {
    return this.isOwner;
  }

  getEmail() {
    return this.email;
  }

}
