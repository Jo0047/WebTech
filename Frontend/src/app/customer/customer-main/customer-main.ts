import { Component } from '@angular/core';

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisineTags: string[];
  rating: number;
}

@Component({
  selector: 'app-customer-main',
  imports: [],
  templateUrl: './customer-main.html',
  styleUrl: './customer-main.css',
})
export class CustomerMain {
  title = 'uber-drinks';
  isMenuOpen = false;

  restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Destillerie Brenngeist',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=500&h=300&fit=crop',
      cuisineTags: ['Bar', 'Drinks'],
      rating: 4.5
    }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    // Prevent body scroll when menu is open
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  onOverlayClick(): void {
    this.closeMenu();
  }

  onEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}
