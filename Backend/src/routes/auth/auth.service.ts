import {pool} from '../../db';
import * as bcrypt from 'bcrypt';
import {QueryResult} from "pg";
import sgMail from '@sendgrid/mail';
import * as restaurantService from '../restaurant/restaurant.service'
import dotenv from "dotenv";
import path from "path";
import jwt from 'jsonwebtoken';

dotenv.config();

sgMail.setApiKey("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");

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
async function register(firstname: string, lastname: string, email: string, password: string, street: string, streetNumber: number, city: string, zipCode: number, restaurantName: string, restaurantEmail: string, restaurantPhoneNumber: string, imageUrl: string) {

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
            text:  'INSERT INTO restaurant (restaurant_name, restaurant_email, phone_number, image_link, address_id, owner_email) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [restaurantName, restaurantEmail, restaurantPhoneNumber,imageUrl,addressId, ownerEmail]
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

async function sendPasswordResetEmail(email: string) {

    const token = await generateResetToken(email)

    const url = `http://localhost:4200/newPassword?token=${token}`

    console.log(email)

    const msg = {
        to: email,
        from: 'johanneskr@edu.aau.at',
        subject: 'Password Reset Link',
        text: 'Click the link to reset your password',
        html: `<a href="${url}" class="button">Reset Password</a>`,
    }
    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
        return {
            success: true,
            message: 'Email sent successfully',
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            success: false,
            message: 'Error sending email: ' + error,
        };
    }
}

async function generateResetToken(email: string) {

    let jwt_sescret = process.env["JWT_SECRET"];
    if (!jwt_sescret) {
        throw new Error('JWT_SECRET is not defined');
    }

    const payload = {
        email: email,
        type: 'password-reset',
    };

    return jwt.sign(payload,jwt_sescret , {expiresIn: '1h'});
}

function verifyResetToken(token: string) {

    let jwt_sescret = process.env["JWT_SECRET"];


    if (!jwt_sescret) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const decoded = jwt.verify(token, jwt_sescret) as any;

        if (decoded.type !== 'password-reset') {
            return {
                success: false,
                message: 'Invalid token type!',
            };
        }

        return {
            success: true,
            email: decoded.email,
        };

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return {
                success: false,
                message: 'Tokens has expires!',
            };
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return {
                success: false,
                message: 'Invalid token!',
            };
        }
        return {
            success: false,
            message: 'Error: '+error,
        };
    }
}

async function resetPassword(token: string, newPassword: string) {
    const jwt_secret = process.env['JWT_SECRET'];

    if (!jwt_secret) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const decoded = jwt.verify(token, jwt_secret) as any;

        if (decoded.type !== 'password-reset') {
            return {
                success: false,
                message: 'Invalid token type!',
            };
        }

        const email = decoded.email;

        const hashedPassword = await bcrypt.hash(newPassword, 15);

        const resetPasswordQuery = {
            text: 'UPDATE "user" SET password = $1 WHERE email = $2',
            values: [hashedPassword, email]
        };

        const result: QueryResult = await pool.query(resetPasswordQuery);

        if (result.rowCount === 0) {
            return {
                success: false,
                message: 'Failed to update password!',
            };
        }

        console.log('Password updated successfully for:', email);

        return {
            success: true,
            message: 'Password reset successful!',
            email: email,
        };

    } catch (error) {
        console.error('Password reset error:', error);

        if (error instanceof jwt.TokenExpiredError) {
            return {
                success: false,
                message: 'Token has expired!',
            };
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return {
                success: false,
                message: 'Invalid token!',
            };
        }
        return {
            success: false,
            message: 'Error: ' + error,
        };
    }
}

export { login , register, getAllAddresses, getAllUsers, getAddress, getUser, sendPasswordResetEmail, verifyResetToken,resetPassword};