import {QueryResult} from "pg";
import {pool} from "../../db";
import {parsePgArray} from "../../postgresParser";
import {Cuisine} from "../../types";

export async function getRestaurantAddress(id: number) {
    const query = `
      SELECT id, street, street_number, zip_code, city
      FROM address
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);

    return result.rows[0]
}

/**
 * Select all Restaurants
 */
async function getAllRestaurants(){
    const query = {
        text:  'SELECT * FROM order',
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `No restaurants found.`,
            };
        }

        return {
            success: true,
            restaurants: result.rows
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}


/**
 * Select all Restaurants including cuisines and rating
 */
async function getRestaurantsWithCuisine() {
    const query = {
        text: `SELECT
                   r.id,
                   r.restaurant_name,
                   r.restaurant_email,
                   r.phone_number,
                   r.image_link,
                   r.address_id,
                   r.owner_email,
                   r.cuisines,
                   COALESCE(AVG(rev.rating), 0) AS average_rating
               FROM
                   restaurant r
                       LEFT JOIN
                   review rev ON r.id = rev.restaurant_id
               GROUP BY
                   r.id,
                   r.restaurant_name,
                   r.restaurant_email,
                   r.phone_number,
                   r.image_link,
                   r.address_id,
                   r.owner_email
               ORDER BY
                   r.restaurant_name;`
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `No restaurants found.`,
            };
        }
        return {
            success: true,
            restaurants: result.rows.map(row => ({
                ...row,
                cuisines: parsePgArray<Cuisine>(row.cuisines),
            }))
        }

    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }

}

async function getRestaurantByName(restaurantName: string, addressId: number) {
    const query = {
        text: 'SELECT * FROM restaurant WHERE restaurant_name=$1 AND address_id=$2',
        values: [restaurantName, addressId],
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `Restaurant does not exist`
            };
        }

        return {
            success: true,
            restaurant: result.rows[0]
        }

    } catch (error) {
        console.error('Error fetching order:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

async function getRestaurantIdByOwnerEmail(email: string) {
    const query = {
        text: 'SELECT id FROM restaurant WHERE owner_email=$1',
        values: [email],
    };
    const result: QueryResult = await pool.query(query);

    if (result.rows.length == 0) {
        return {
            restaurant_id: -1,
        };
    }

    return {
        restaurant_id: result.rows[0].id,
    }
}


async function getRestaurantImage(restaurantId: number) {
    const query = {
        text:  'SELECT image_link FROM order WHERE restaurant_id = $1 RETURNING image_link',
        values: [restaurantId],
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `No Restaurant found.`,
            };
        }

        return {
            success: true,
            restaurant: result.rows[0].image_link
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

export {getRestaurantsWithCuisine, getRestaurantIdByOwnerEmail, getRestaurantByName, getRestaurantImage, getAllRestaurants};