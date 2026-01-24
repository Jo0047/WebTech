import { pool } from '../../db';
import {QueryResult} from "pg";


async function getDrinksByRestaurant(restaurant_id: number) {
    const response: QueryResult = await pool.query(
        'SELECT drink_name, category, ingredients, alcoholic, price FROM drink WHERE restaurant_id = $1',
        [restaurant_id]
    );
    return response.rows;
}
export { getDrinksByRestaurant };