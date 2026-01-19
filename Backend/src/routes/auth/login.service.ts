import { pool } from '../../db';
import {QueryResult} from "pg";


async function login(email: string, password: string) {
    const user: QueryResult = await pool.query(
        'SELECT id, email, password FROM users WHERE email = $1',
        [email]
    );

    let successful = false;
    if (user.rows[0].password == password) {
        successful = true;
    }
    let is_owner: boolean = user.rows[0].is_owner;

    return {successful, is_owner};
}
export { login };