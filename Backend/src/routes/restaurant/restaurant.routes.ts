import * as restaurantService from ".//restaurant.service";
import * as imageService from "./image.service";
import fs from "node:fs";
import router from "./image.routes";

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

/**
 * Get Image by restaurantID and Filename
 */
router.get("/:restaurantId/:filename", async (req, res) => {

    const restaurantId = req.params.restaurantId;
    const filename = req.params.filename;

    try {

        const filePath = imageService.getImagePath(parseInt(restaurantId), filename);

        if (fs.existsSync(filePath)) {
            return res.status(404).json({
                message: 'Image not found'
            });
        }

        return res.status(200).send(filePath);

        /*
        // Determine content type
        const ext = path.extname(filename).toLowerCase();
        const contentTypes: { [key: string]: string } = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png'
        };

        const contentType = contentTypes[ext] || 'image/jpeg';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

        return res.sendFile(path.resolve(filePath));
         */
    } catch (error) {
        console.error('Error serving image:', error);
        return res.status(500).json({
            message: 'Failed to serve image'
        });
    }
});

export default router;