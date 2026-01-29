import {pool} from "../../db";
import {QueryResult} from "pg";

async function getAllUsers() {
    const query = {
        text:  'SELECT * FROM "user"',
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `No users found.`,
            };
        }

        return {
            success: true,
            users: result.rows
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

async function getAllAddresses() {
    const query = {
        text:  'SELECT * FROM address',
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `No addresses found.`,
            };
        }

        return {
            success: true,
            addresses: result.rows
        }

    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

async function getAllRestaurants(){
    const query = {
        text:  'SELECT * FROM restaurant',
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
 * Get User from Database via email
 * @param email of the user (PK)
 */
async function getUser(email: string) {
    const query = {
        text: 'SELECT * FROM "user" WHERE email = $1',
        values: [email]
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `User with email: ${email} does not exist`
            };
        }

        return {
            success: true,
            user: result.rows[0]
        }

    } catch (error) {
        console.error('Error fetching user:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

async function getAddress(street: string, streetNumber: number, zipCode: number, city: string) {
    const query = {
        text: 'SELECT * FROM address WHERE street=$1 AND street_number=$2 AND zip_code=$3 AND city=$4',
        values: [street, streetNumber, zipCode, city],
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows.length == 0) {
            return {
                success: false,
                message: `Address does not exist`
            };
        }

        return {
            success: true,
            address: result.rows[0]
        }

    } catch (error) {
        console.error('Error fetching address:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

async function getRestaurant(restaurantName: string, addressId: number) {
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
        console.error('Error fetching restaurant:', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }
    }
}

export {getAllUsers, getAllAddresses, getAllRestaurants, getUser, getAddress, getRestaurant};