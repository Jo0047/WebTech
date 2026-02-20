import * as restaurantService from ".//restaurant.service";
import * as imageService from "./image.service";
import fs from "node:fs";
import router from "./image.routes";
import path from "path";
import {upload} from "./multer.config";

router.get("/restaurants", async (req, res) => {
    const result = await restaurantService.getAllRestaurants();

    if (result.success) {
        return res.status(200).json({
            user: result.restaurants
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})


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

router.get("/restaurantId", async (req, res) => {
    const owner_email = req.query["owner_email"] as string;

    if (!owner_email) {
        return res.status(400).json({ error: "owner_email is required" });
    }

    const { restaurant_id } = await restaurantService.getRestaurantIdByOwnerEmail(owner_email);

    return res.status(200).json({ restaurant_id });
});

router.get("/address", async (req, res) => {
    const restaurant_id = parseInt(req.query["id"] as string, 10);

    const address = await restaurantService.getRestaurantAddress(restaurant_id);
    return res.status(200).json({address});
})

/**
 * Get Image by restaurantID and Filename
 */
router.post("/uploadImage", upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'No file uploaded'
        });
    }
    const imageUrl = `http://localhost:3000/restaurant/image/${req.file.filename}`;
    return res.status(200).json({
        url: imageUrl
    });

});

router.get("/defaultImage", async (req, res) => {
    return res.status(200).sendFile(path.resolve("images/elementor-placeholder-image.png"));
})

// Serve any stored image by filename
router.get("/image/:filename", async (req, res) => {
    return res.status(200).sendFile(path.resolve(`images/${req.params.filename}`));
});

export default router;