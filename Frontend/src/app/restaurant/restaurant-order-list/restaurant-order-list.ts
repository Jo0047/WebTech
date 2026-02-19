import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {OrderStatus} from '../../models/OrderStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import {Order} from '../../models/order';







@Component({
  selector: 'app-order-order-list',
  imports: [],
  templateUrl: './restaurant-order-list.html',
  styleUrl: './restaurant-order-list.css',
})
export class RestaurantOrderList implements OnInit{
  restaurantService: RestaurantService = inject(RestaurantService);
  private snackBar = inject(MatSnackBar);
  map: L.Map | null = null;
  activeOrderId: number | null = null;


  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/orders';

  orders: Order[] = [];

  ngOnInit() {
    this.loadOrders()
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    });


  }

  loadOrders() {
    this.restaurantService.getRestaurantId().then(id => {
      this.fetchOrders(id);
    });
  }

  fetchOrders(id: number) {
    this.http.get<Order[]>(this.apiUrl + '/order', {
      params: { restaurant_id: id }
    }).subscribe({
      next: data => {
        this.orders = data.sort((a, b) => b.order_id - a.order_id);
        console.log('orders loaded:', this.orders);
      },
      error: err => console.error(err)
    });
  }

  async rejectOrder(order: Order) {
    this.http.post(this.apiUrl + '/reject', order).subscribe({
      next: () => {
        this.loadOrders()
      }
    })
  }

  advanceOrder(order: Order) {
      this.http.post(this.apiUrl + '/advance', order).subscribe({
        next: () => {
          this.loadOrders()
        }
      })
  }

  protected readonly OrderStatus = OrderStatus;

  showMap(order: Order) {
    this.activeOrderId = order.order_id;

    const fullAddress = `${order.address.street} ${order.address.street_number}, ${order.address.zip_code} ${order.address.city}`;

    // Geocode address using OpenStreetMap Nominatim
    this.http.get<any>('https://nominatim.openstreetmap.org/search', {
      params: { q: fullAddress, format: 'json', limit: '1' }
    }).subscribe(result => {
      if (!result.length) {
        console.warn('Address not found');
        return;
      }

      const lat = parseFloat(result[0].lat);
      const lon = parseFloat(result[0].lon);

      // wait a tick to make sure Angular rendered the div
      setTimeout(() => {
        const mapId = 'map-' + order.order_id;
        const mapDiv = document.getElementById(mapId);

        if (!mapDiv) return;

        // Remove existing map if Leaflet has one attached
        if ((mapDiv as any)._leaflet_map) {
          (mapDiv as any)._leaflet_map.remove();
        }

        // Initialize Leaflet map
        const map = L.map(mapId).setView([lat, lon], 15);

        // Store reference to map on the div
        (mapDiv as any)._leaflet_map = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(fullAddress)
          .openPopup();
      }, 0);
    });
  }

}
