import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-product-list',
  templateUrl: './restaurant-product-list.html',
  styleUrl: './restaurant-product-list.css',
})
export class RestaurantProductList {
  //TODO get from backend
  products = [
    {
      drink_name: 'Mojito',
      category: 'Cocktail',
      ingredients: 'White rum, mint leaves, lime juice, sugar, soda water',
      alcoholic: true,
      price: 9.5,
      restaurant_id: 1
    },
    {
      drink_name: 'Iced Latte',
      category: 'Coffee',
      ingredients: 'Espresso, milk, ice',
      alcoholic: false,
      price: 4.25,
      restaurant_id: 1
    },
    {
      drink_name: 'Fresh Orange Juice',
      category: 'Juice',
      ingredients: 'Fresh oranges',
      alcoholic: false,
      price: 3.75,
      restaurant_id: 2
    },
    {
      drink_name: 'IPA Draft Beer',
      category: 'Beer',
      ingredients: 'Water, barley, hops, yeast',
      alcoholic: true,
      price: 6.0,
      restaurant_id: 3
    },
    {
      drink_name: 'Cappuccino',
      category: 'Coffee',
      ingredients: 'Espresso, steamed milk, foam',
      alcoholic: false,
      price: 4.5,
      restaurant_id: 1
    },
    {
      drink_name: 'Piña Colada',
      category: 'Cocktail',
      ingredients: 'White rum, coconut cream, pineapple juice',
      alcoholic: true,
      price: 10.0,
      restaurant_id: 2
    },
    {
      drink_name: 'Green Smoothie',
      category: 'Smoothie',
      ingredients: 'Spinach, kale, banana, almond milk',
      alcoholic: false,
      price: 5.5,
      restaurant_id: 2
    },
    {
      drink_name: 'Red Wine',
      category: 'Wine',
      ingredients: 'Cabernet Sauvignon grapes',
      alcoholic: true,
      price: 12.0,
      restaurant_id: 3
    },
    {
      drink_name: 'Lemonade',
      category: 'Juice',
      ingredients: 'Lemon juice, water, sugar',
      alcoholic: false,
      price: 3.0,
      restaurant_id: 1
    },
    {
      drink_name: 'Espresso',
      category: 'Coffee',
      ingredients: 'Espresso shot',
      alcoholic: false,
      price: 3.5,
      restaurant_id: 1
    },
    {
      drink_name: 'Margarita',
      category: 'Cocktail',
      ingredients: 'Tequila, triple sec, lime juice, salt',
      alcoholic: true,
      price: 11.0,
      restaurant_id: 2
    },
    {
      drink_name: 'Chai Latte',
      category: 'Tea',
      ingredients: 'Black tea, spices, milk, sugar',
      alcoholic: false,
      price: 4.0,
      restaurant_id: 1
    }
  ];


}
