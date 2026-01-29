import { Router } from "express";
import * as drinkService from "./drink.service";

const router = Router();

router.get("/drink", async (req, res) => {

    const restaurant_id_str = req.query["restaurant_id"];
    const restaurant_id = Number(restaurant_id_str);

    const drinks = await drinkService.getDrinksByRestaurant(restaurant_id);

    res.json(drinks);
});

router.post("/drink", async (req, res) => {
    let drinkData = req.body;
    await drinkService.addDrink(
        drinkData.drink_name,
        drinkData.category,
        drinkData.ingredients,
        drinkData.alcoholic,
        drinkData.price,
        drinkData.restaurant_id,

    )
})
export default router;