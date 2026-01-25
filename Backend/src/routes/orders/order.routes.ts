import { Router } from "express";
import * as drinkService from "./order.service";

const router = Router();

router.get("/order", async (req, res) => {

    const restaurant_id_str = req.query["restaurant_id"];
    const restaurant_id = Number(restaurant_id_str);

    const orders = await drinkService.getOrdersByRestaurant(restaurant_id);

    res.json(orders);

});
export default router;