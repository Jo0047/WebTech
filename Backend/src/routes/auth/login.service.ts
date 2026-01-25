import { pool } from '../../db';
import * as getService from "../get/get.service";

import {QueryResult} from "pg";


async function login(email: string, password: string) {
    const query = {
        text: 'SELECT * FROM "user" WHERE email = $1',
        values: [email],
    };

    try {
        const result: QueryResult = await pool.query(query);

        if (result.rows[0].password == password) {
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


async function register(firstname: string, lastname: string, email: string, password: string,
                        street: string, streetNumber: number,city: string, zipCode: number,
                        restaurantName: string, restaurantEmail: string,restaurantPhoneNumber: string) {

    let userCheck = await getService.getUser(email)

    if (userCheck.success) {
        return {
            success: false,
            message: 'Email is already registered!'
        }
    }

    let addressCheck = await getService.getAddress(street,streetNumber,zipCode,city)
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

    const userQuery = {
        text:  'INSERT INTO "user" (email, password, first_name, last_name, is_owner, address_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING email',
        values: [email, password, firstname, lastname, isOwner, addressId]
    };

    let userResult = await pool.query(userQuery)
    let ownerEmail = userResult.rows[0].email;

    if (isOwner) {

        let restaurantCheck = await getService.getRestaurant(restaurantName, addressId)

        if (restaurantCheck.success) {
            return {
                success: false,
                message: 'Restaurant already exists at the entered location!'
            };
        }

        const restaurantQuery = {
            text:  'INSERT INTO restaurant (restaurant_name, restaurant_email, phone_number, address_id, owner_email) VALUES ($1, $2, $3, $4, $5)',
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



export { login , register};