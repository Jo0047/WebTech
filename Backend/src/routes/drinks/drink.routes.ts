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

/**
 * delete drink by setting deleted flag
 */
router.delete("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    await drinkService.deleteDrink(id);
    return res.status(200).json({});
})

router.put("/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let drinkData = req.body;

    await drinkService.updateDrink(
        id,
        drinkData.drink_name,
        drinkData.category,
        drinkData.ingredients,
        drinkData.alcoholic,
        drinkData.price
    );

    return res.status(200).json({});
});

/**
 * get drink by id
 */
router.get("/drink/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const drink = await drinkService.getDrinkById(id);
    res.json(drink);
});



export default router;