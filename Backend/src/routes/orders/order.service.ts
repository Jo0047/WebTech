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

async function rejectOrder(order_id: number) {
    console.log(order_id, "rejected");
    await pool.query(
        'UPDATE "order"\n' +
        'SET status = \'rejected\'\n' +
        'WHERE id = $1\n', [order_id]
    )
}

async function advanceOrder(order_id: number) {
    await pool.query(
        'UPDATE "order"\n' +
        'SET status = CASE status\n' +
        '    WHEN \'pending\'    THEN \'preparing\'\n' +
        '    WHEN \'preparing\'  THEN \'ready\'\n' +
        '    WHEN \'ready\'      THEN \'dispatched\'\n' +
        '    WHEN \'dispatched\' THEN \'arrived\'\n' +
        '    ELSE status\n' +
        'END\n' +
        'WHERE id = $1\n', [order_id]
    )
}
export { getOrdersByRestaurant, rejectOrder, advanceOrder };