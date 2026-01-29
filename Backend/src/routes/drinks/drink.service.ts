import { pool } from '../../db';
import {QueryResult} from "pg";


async function getDrinksByRestaurant(restaurant_id: number) {
    const response: QueryResult = await pool.query(
        'SELECT drink_name, category, ingredients, alcoholic, price FROM drink WHERE restaurant_id = $1',
        [restaurant_id]
    );
    return response.rows;
}

async function addDrink(drink_name: string, category: string, ingredients: string, alcoholic: boolean, price: number, restaurant_id: number) {
    await pool.query('INSERT INTO drink (drink_name, category, ingredients, alcoholic, price, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [drink_name, category, ingredients, alcoholic, price, restaurant_id])
}

export { getDrinksByRestaurant, addDrink };