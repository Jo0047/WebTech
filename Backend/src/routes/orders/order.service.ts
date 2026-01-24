import { pool } from '../../db';
import {QueryResult} from "pg";


async function getOrdersByRestaurant(restaurant_id: number) {
    const response: QueryResult = await pool.query(
        'SELECT DISTINCT\n' +
        '    o.id AS order_id,\n' +
        '    o.status AS order_status,\n' +
        '    r.restaurant_name\n' +
        'FROM "order" o\n' +
        'JOIN order_drinks od ON o.id = od.order_id\n' +
        'JOIN drink d ON od.drink_id = d.id\n' +
        'JOIN restaurant r ON d.restaurant_id = r.id\n' +
        'WHERE r.id = $1;',
        [restaurant_id]
    );
    return response.rows;
}
export { getOrdersByRestaurant };