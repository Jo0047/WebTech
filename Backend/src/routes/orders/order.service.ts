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
        'WHERE d.restaurant_id = $1 -- Filter by your order ID\n' +
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

async function placeOrder(user_email: string, items: { drink_id: number; quantity: number }[]) {

    const orderQuery = {
        text:  'INSERT INTO "order" (status) VALUES (\'pending\') RETURNING id',
    };

    let orderResult: QueryResult = await pool.query(orderQuery)
    const order_id: number = orderResult.rows[0].id;

    const orderUserQuery = {
        text: 'INSERT INTO user_order (user_email, order_id) VALUES ($1, $2)',
        values: [user_email, order_id]
    }

    let orderUserResult: QueryResult = await pool.query(orderUserQuery)

    for (const item of items) {
        let orderDrinskQuery = {
            text: 'INSERT INTO order_drinks (order_id, drink_id, quantity) VALUES ($1, $2, $3)',
            values:  [order_id, item.drink_id, item.quantity]
        }

        let orderDrinksResult: QueryResult = await pool.query(orderDrinskQuery);
    }

    return {
        success: true,
        orderId: order_id,
    };
}

export { getOrdersByRestaurant, rejectOrder, advanceOrder, placeOrder };