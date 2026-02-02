import {Cuisine} from './cuisine';

export interface Restaurant {
  id: number;
  restaurant_name: string;
  restaurant_email: string;
  phone_number: string;
  image_link: string | null;
  address_id: number;
  owner_email: string;
  cuisines: Cuisine[];
  average_rating: string;
}
