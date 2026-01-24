import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-order-list',
  imports: [],
  templateUrl: './restaurant-order-list.html',
  styleUrl: './restaurant-order-list.css',
})
export class RestaurantOrderList {
  orders = [
      {
        id: 101,
        status: "pending",
        drinks: [
          { drink_name: "Mojito", quantity: 2, price: 8.5 },
          { drink_name: "Lemonade", quantity: 1, price: 3.0 }
        ]
      },
      {
        id: 102,
        status: "preparing",
        drinks: [
          { drink_name: "Old Fashioned", quantity: 1, price: 10.0 },
          { drink_name: "Whiskey Sour", quantity: 2, price: 9.0 }
        ]
      },
      {
        id: 103,
        status: "ready",
        drinks: [
          { drink_name: "Beer", quantity: 3, price: 5.0 },
          { drink_name: "Gin & Tonic", quantity: 1, price: 7.5 }
        ]
      },
      {
        id: 104,
        status: "dispatched",
        drinks: [
          { drink_name: "Tequila Shot", quantity: 4, price: 4.0 }
        ]
      }
    ];


}
