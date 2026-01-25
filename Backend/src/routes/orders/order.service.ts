import { pool } from '../../db';
import {QueryResult} from "pg";


async function getOrdersByRestaurant(restaurant_id: number) {
    const response: QueryResult = await pool.query(
        'SELECT \n' +
        '    o.id AS order_id,\n' +
        '    o.status AS order_status,\n' +
        '    json_agg(\n' +
        '        json_build_object(\n' +
        '            \'drink_name\', d.drink_name,\n' +
        '            \'quantity\', od.quantity,\n' +
        '            \'unit_price\', d.price\n' +
        '        )\n' +
        '    ) AS drinks\n' +
        'FROM "order" o\n' +
        'JOIN order_drinks od ON o.id = od.order_id\n' +
        'JOIN drink d ON od.drink_id = d.id\n' +
        'WHERE d.restaurant_id = $1 -- Filter by your restaurant ID\n' +
        'GROUP BY o.id, o.status;',
        [restaurant_id]
    );
    return response.rows;
}
export { getOrdersByRestaurant };