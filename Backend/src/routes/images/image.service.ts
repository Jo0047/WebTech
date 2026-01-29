import {pool} from "../../db";
import {QueryResult} from "pg";
import path from "path";

const imageDir = 'files';

async function getRestaurantImage(restaurantId: number) {
    const query = {
        text:  'SELECT image_link FROM restaurant WHERE restaurant_id = $1 RETURNING image_link',
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

function getImagePath(restaurantId: number, filename: string): string {
    return path.join(imageDir, restaurantId.toString(), filename);
}

export {getImagePath, getRestaurantImage};