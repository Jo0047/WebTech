import { Router } from "express";
import * as orderService from "./order.service";
import * as authService from "../auth/auth.service";

const router = Router();

router.get("/order", async (req, res) => {

    const restaurant_id_str = req.query["restaurant_id"];
    const restaurant_id = Number(restaurant_id_str);

    const orders = await orderService.getOrdersByRestaurant(restaurant_id);

    res.json(orders);

});

router.post("/reject", async (req, res) => {
    let orderData = req.body;
    await orderService.rejectOrder(orderData.order_id);
    res.status(200).json(orderData);
})

router.post("/advance", async (req, res) => {
    let orderData = req.body;

    console.log(orderData, "advancing...");
    await orderService.advanceOrder(orderData.order_id);
    console.log(orderData, "advanced");

    res.status(200).json(orderData);
})

router.post("/placeOrder", async (req, res) => {
    const { user_email, items } = req.body;

    let result = await orderService.placeOrder(user_email, items);

    if (result.success) {
        return res.status(200).json({
            orderId: result.orderId
        });
    } else {
        return res.status(400).json({
            message: 'Error'
        });
    }

});

router.get('/voucher', async (req, res) => {
    const { restaurantId, voucher } = req.query;

    if (!restaurantId || !voucher) {
        return res.status(400).json({ message: 'Missing parameters.' });
    }

    const result = await orderService.checkVoucher(Number(restaurantId), String(voucher));

    if (!result.discount==null) {
        return res.status(404).json({
            message: result.message
        });
    }

    return res.status(200).json({
        message: result.message,
        discount: result.discount
    });
});

export default router;