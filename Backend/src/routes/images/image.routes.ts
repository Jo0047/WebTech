import * as imageService from "../images/image.service";
import {Router} from "express";
import path from "path";
import * as fs from "node:fs";
const router = Router();

router.get("/defaultImage", async (req, res) => {
    return res.status(200).sendFile(path.join(__dirname,"files/elementor-placeholder-image.png"));
})

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
