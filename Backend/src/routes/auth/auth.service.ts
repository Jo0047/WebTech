import { pool } from '../../db';
import * as bcrypt from 'bcrypt';

import {QueryResult} from "pg";
import * as restaurantService from '../restaurant/restaurant.service'

/**
 * Login user
 * @param email
 * @param password
 */
async function login(email: string, password: string) {
    const query = {
        text: 'SELECT * FROM "user" WHERE email = $1',
        values: [email],
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (await bcrypt.compare(password,result.rows[0].password)){
            return {
                success: true,
                email: email,
                isOwner: result.rows[0].is_owner,
            };
        }

        return {
            success: false,
            message: 'Wrong Password or Email!'
        }

    }catch (error) {
        console.error('Error logging in', error);
        return {
            success: false,
            message: 'Database error: '+error,
        }

    }
}

/**
 * Create new user in database if email is not in use. Creates a new Address if not already existing and optional a new Restaurant
 * if no restaurant exists with the same name on the given address.
 * @param firstname
 * @param lastname
 * @param email
 * @param password
 * @param street
 * @param streetNumber
 * @param city
 * @param zipCode
 * @param restaurantName
 * @param restaurantEmail
 * @param restaurantPhoneNumber
 */
async function register(firstname: string, lastname: string, email: string, password: string,
                        street: string, streetNumber: number,city: string, zipCode: number,
                        restaurantName: string, restaurantEmail: string,restaurantPhoneNumber: string) {

    let userCheck = await getUser(email)

    if (userCheck.success) {
        return {
            success: false,
            message: 'Email is already registered!'
        }
    }

    let addressCheck = await getAddress(street,streetNumber,zipCode,city)
    let addressId

    if (!addressCheck.success){
        const addressQuery = {
            text:  'INSERT INTO address (street, street_number, zip_code, city) VALUES ($1, $2, $3, $4) RETURNING id',
            values: [street, streetNumber, zipCode, city]
        };

        const addressResult: QueryResult = await pool.query(addressQuery);
        addressId = addressResult.rows[0].id;
    }else{
        addressId = addressCheck.address.id;
    }

    let isOwner = (restaurantName !== undefined && restaurantEmail !== undefined && restaurantPhoneNumber !== undefined);

    let hashedPassword = await bcrypt.hash(password,15); //hash for 15 rounds

    const userQuery = {
        text:  'INSERT INTO "user" (email, password, first_name, last_name, is_owner, address_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING email',
        values: [email, hashedPassword, firstname, lastname, isOwner, addressId]
    };

    let userResult = await pool.query(userQuery)
    let ownerEmail = userResult.rows[0].email;

    if (isOwner) {

        let restaurantCheck = await restaurantService.getRestaurantByName(restaurantName, addressId)

        if (restaurantCheck.success) {
            return {
                success: false,
                message: 'Restaurant already exists at the entered location!'
            };
        }

        const restaurantQuery = {
            text:  'INSERT INTO order (restaurant_name, restaurant_email, phone_number, address_id, owner_email) VALUES ($1, $2, $3, $4, $5)',
            values: [restaurantName, restaurantEmail, restaurantPhoneNumber,addressId, ownerEmail]
        };

        let restaurantResult = await pool.query(restaurantQuery);
    }

    return {
        success: true,
        email: ownerEmail,
        isOwner: isOwner
    };
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

/**
 * Get Address from the Database
 * @param street
 * @param streetNumber
 * @param zipCode
 * @param city
 */
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

/**
 * Get all Users
 */
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

/**
 * Get all Addresses
 */
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


export { login , register, getAllAddresses, getAllUsers, getAddress, getUser};