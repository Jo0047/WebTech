import * as restaurantService from ".//restaurant.service";
import router from "../general/get.routes";

router.get("/restaurantsWithCuisines", async (req, res) => {
    const result = await restaurantService.getRestaurantsWithCuisine();

    if (result.success) {
        return res.status(200).json({
            restaurants: result.restaurants
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})

router.get("/drinks/:restaurantId", async (req, res) => {
    const restaurantId: number = parseInt(req.params.restaurantId)

    const result = await restaurantService.getDrinksByRestaurant(restaurantId);

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

export default router;