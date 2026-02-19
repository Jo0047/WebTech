import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {OrderStatus} from '../../models/OrderStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';
import {Order} from '../../models/order';
import {firstValueFrom} from 'rxjs';







@Component({
  selector: 'app-order-order-list',
  imports: [],
  templateUrl: './restaurant-order-list.html',
  styleUrl: './restaurant-order-list.css',
})
export class RestaurantOrderList implements OnInit {
  restaurantService: RestaurantService = inject(RestaurantService);
  private snackBar = inject(MatSnackBar);
  map: L.Map | null = null;
  activeOrderId: number | null = null;


  private http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/orders';

  orders: Order[] = [];

  ngOnInit() {
    this.loadAddress();
    this.loadOrders();

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

  loadAddress() {
    this.restaurantService.getRestaurantAddress().then(address => {
      console.log(address);
    })
  }

  fetchOrders(id: number) {
    this.http.get<Order[]>(this.apiUrl + '/order', {
      params: {restaurant_id: id}
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


async showMap(order: Order) {
  this.activeOrderId = order.order_id;

  const orderAddress = `${order.address.street} ${order.address.street_number}, ${order.address.zip_code} ${order.address.city}`;

  try {
    // Get restaurant address
    const restaurantAddr = await this.restaurantService.getRestaurantAddress();
    const restaurantAddress = `${restaurantAddr.street} ${restaurantAddr.street_number}, ${restaurantAddr.zip_code} ${restaurantAddr.city}`;

    // Geocode function using firstValueFrom
    const geocode = (address: string) =>
      firstValueFrom(
        this.http.get<any>('https://nominatim.openstreetmap.org/search', {
          params: { q: address, format: 'json', limit: '1' }
        })
      );

    // Geocode both addresses in parallel
    const [orderResult, restaurantResult] = await Promise.all([
      geocode(orderAddress),
      geocode(restaurantAddress)
    ]);

    if (!orderResult.length || !restaurantResult.length) {
      console.warn('Address not found');
      return;
    }

    const orderLat = parseFloat(orderResult[0].lat);
    const orderLon = parseFloat(orderResult[0].lon);
    const restaurantLat = parseFloat(restaurantResult[0].lat);
    const restaurantLon = parseFloat(restaurantResult[0].lon);

    // Calculate distance in km
    const orderLatLng = L.latLng(orderLat, orderLon);
    const restaurantLatLng = L.latLng(restaurantLat, restaurantLon);
    const distanceKm = (restaurantLatLng.distanceTo(orderLatLng) / 1000).toFixed(2);

    setTimeout(() => {
      const mapId = 'map-' + order.order_id;
      const mapDiv = document.getElementById(mapId);
      if (!mapDiv) return;

      // Remove existing map
      if ((mapDiv as any)._leaflet_map) {
        (mapDiv as any)._leaflet_map.remove();
      }

      // Initialize map and fit both points (LatLngTuple)
      const map = L.map(mapId).fitBounds([
        [restaurantLat, restaurantLon],
        [orderLat, orderLon]
      ]);
      (mapDiv as any)._leaflet_map = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Order marker
      L.marker([orderLat, orderLon])
        .addTo(map)
        .bindPopup(`Order: ${orderAddress}<br>Distance from restaurant: ${distanceKm} km`)
        .openPopup();

      // Restaurant marker
      L.marker([restaurantLat, restaurantLon])
        .addTo(map)
        .bindPopup(`Restaurant: ${restaurantAddress}`);

      // Draw a line between restaurant and order
      L.polyline([
        [restaurantLat, restaurantLon],
        [orderLat, orderLon]
      ], { color: 'blue', weight: 3, dashArray: '5,5' }).addTo(map);

    }, 0);

  } catch (err) {
    console.error('Error loading map:', err);
  }
}

}
