import { Router } from "express";
import * as drinkService from "./drink.service";
import * as restaurantService from "../restaurant/restaurant.service";

const router = Router();

/**
 * Get all drinks by restaurantID
 */
router.get("/:restaurantId", async (req, res) => {
    const restaurantId: number = parseInt(req.params.restaurantId)

    const result = await drinkService.getDrinksByRestaurant(restaurantId);

    if (result.success) {
        return res.status(200).json({
            drinks: result.drinks
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})


/**
 * Add new drink to BD
 */
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

router.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);
    await drinkService.deleteDrink(id);
    return res.status(200).json({});
})
export default router;