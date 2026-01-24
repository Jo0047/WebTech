import { pool } from '../../db';
import {QueryResult} from "pg";


async function getOrdersByRestaurant(restaurant_id: number) {
    const response: QueryResult = await pool.query(
        'SELECT \n' +
        '    o.id AS order_id,\n' +
        '    o.status AS order_status,\n' +
        '    d.drink_name,\n' +
        '    od.quantity,\n' +
        '    d.price AS unit_price,\n' +
        '    (od.quantity * d.price) AS line_total\n' +
        'FROM "order" o\n' +
        'JOIN order_drinks od ON o.id = od.order_id\n' +
        'JOIN drink d ON od.drink_id = d.id\n' +
        'JOIN restaurant r ON d.restaurant_id = r.id\n' +
        'WHERE r.id = $1\n' +
        'ORDER BY o.id, d.drink_name;',
        [restaurant_id]
    );
    return response.rows;
}
export { getOrdersByRestaurant };