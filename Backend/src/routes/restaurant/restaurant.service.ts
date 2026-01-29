import {QueryResult} from "pg";
import {pool} from "../../db";

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
                   COALESCE(
                           ARRAY_AGG(DISTINCT cr.cuisine) FILTER (WHERE cr.cuisine IS NOT NULL),
                           ARRAY[]::TEXT[]
                   ) AS cuisines,
                   COALESCE(AVG(rev.rating), 0) AS average_rating
               FROM
                   restaurant r
                       LEFT JOIN
                   cuisine_restaurant cr ON r.id = cr.restaurant_id
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
            restaurants: result.rows
        }

    } catch (error) {
        console.error('Error fetching restaurants:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }

}

export {getRestaurantsWithCuisine};