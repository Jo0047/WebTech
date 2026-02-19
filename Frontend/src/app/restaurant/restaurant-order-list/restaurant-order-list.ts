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
export class RestaurantOrderList implements OnInit{
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

    // Full order address
    const orderAddress = `${order.address.street} ${order.address.street_number}, ${order.address.zip_code} ${order.address.city}`;

    // Get restaurant address from service
    this.restaurantService.getRestaurantAddress().then(restaurantAddr => {
      const restaurantAddress = `${restaurantAddr.street} ${restaurantAddr.street_number}, ${restaurantAddr.zip_code} ${restaurantAddr.city}`;

      // Geocode both addresses using Nominatim
      const geocode = (address: string) =>
        firstValueFrom(
          this.http.get<any>('https://nominatim.openstreetmap.org/search', {
            params: { q: address, format: 'json', limit: '1' }
          })
        );


      Promise.all([geocode(orderAddress), geocode(restaurantAddress)])
        .then(results => {
          if (!results[0].length || !results[1].length) {
            console.warn('Address not found');
            return;
          }

          const orderLat = parseFloat(results[0][0].lat);
          const orderLon = parseFloat(results[0][0].lon);

          const restaurantLat = parseFloat(results[1][0].lat);
          const restaurantLon = parseFloat(results[1][0].lon);

          setTimeout(() => {
            const mapId = 'map-' + order.order_id;
            const mapDiv = document.getElementById(mapId);
            if (!mapDiv) return;

            // Remove existing map if present
            if ((mapDiv as any)._leaflet_map) {
              (mapDiv as any)._leaflet_map.remove();
            }

            // Initialize map centered between the two points
            const map = L.map(mapId).fitBounds([
              [orderLat, orderLon],
              [restaurantLat, restaurantLon]
            ]);

            (mapDiv as any)._leaflet_map = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add markers
            L.marker([orderLat, orderLon])
              .addTo(map)
              .bindPopup(`Order: ${orderAddress}`)
              .openPopup();

            L.marker([restaurantLat, restaurantLon], {icon: L.icon({
                iconUrl: 'assets/marker-icon-2x.png',
                shadowUrl: 'assets/marker-shadow.png',
                iconSize: [25,41],
                iconAnchor: [12,41],
                popupAnchor: [1,-34]
              })})
              .addTo(map)
              .bindPopup(`Restaurant: ${restaurantAddress}`);
          }, 0);
        })
        .catch(err => console.error('Geocoding error:', err));
    });
  }

}
