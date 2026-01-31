import { pool } from '../../db';
import {QueryResult} from "pg";

/**
 * Get all Drinks by RestaurantID
 * @param restaurantId
 */
async function getDrinksByRestaurant(restaurantId: number) {
    const query = {
        text: 'SELECT * FROM drink WHERE restaurant_id = $1',
        values: [restaurantId]
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `No drinks found.`,
            };
        }

        return {
            success: true,
            drinks: result.rows
        }

    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

/**
 * Insert new drink into DB
 * @param drink_name
 * @param category
 * @param ingredients
 * @param alcoholic
 * @param price
 * @param restaurant_id
 */
async function addDrink(drink_name: string, category: string, ingredients: string, alcoholic: boolean, price: number, restaurant_id: number) {
    await pool.query('INSERT INTO drink (drink_name, category, ingredients, alcoholic, price, restaurant_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [drink_name, category, ingredients, alcoholic, price, restaurant_id])
}

export { getDrinksByRestaurant, addDrink };