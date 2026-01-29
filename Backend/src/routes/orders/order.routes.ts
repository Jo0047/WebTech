import { Router } from "express";
import * as orderService from "./order.service";

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


export default router;