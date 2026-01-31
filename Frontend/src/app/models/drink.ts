export interface Drink {
  id: number;
  drink_name: string;
  category: string;
  ingredients: string;
  alcoholic: boolean;
  price: number;
  image_link: string | null;
  restaurant_id: number;
}
