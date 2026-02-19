import { pool } from '../../db';
import {QueryResult} from "pg";


async function getOrdersByRestaurant(restaurant_id: number) {
    const response: QueryResult = await pool.query(
        `
    SELECT 
        o.id AS order_id,
        o.status AS order_status,

        json_agg(
            json_build_object(
                'drink_name', d.drink_name,
                'quantity', od.quantity,
                'unit_price', d.price
            )
        ) AS drinks,

        json_build_object(
            'street', a.street,
            'street_number', a.street_number,
            'zip_code', a.zip_code,
            'city', a.city
        ) AS address

    FROM "order" o

    JOIN order_drinks od ON o.id = od.order_id
    JOIN drink d ON od.drink_id = d.id

    JOIN user_order uo ON o.id = uo.order_id
    JOIN "user" u ON u.email = uo.user_email
    JOIN address a ON u.address_id = a.id

    WHERE d.restaurant_id = $1

    GROUP BY o.id, o.status, a.id;
    `,
        [restaurant_id]
    );

    return response.rows;
}


async function rejectOrder(order_id: number) {
    console.log(order_id, "rejected");
    await pool.query(
        `
        UPDATE "order"
        SET status = 'rejected'
        WHERE id = $1`
        , [order_id]

    )
}

async function advanceOrder(order_id: number) {
    await pool.query(
        `UPDATE "order"
        SET status = CASE status
        WHEN 'pending'  THEN 'preparing'
        WHEN 'preparing'THEN 'ready'
        WHEN 'ready'    THEN 'dispatched'
        WHEN 'dispatched' THEN 'arrived'
        ELSE status
        END
        WHERE id = $1`, [order_id]
    )
}
export { getOrdersByRestaurant, rejectOrder, advanceOrder };