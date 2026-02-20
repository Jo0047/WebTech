import {Router} from "express";
import path from "path";
const router = Router();

router.get("/defaultImage", async (req, res) => {
    return res.status(200).sendFile(path.resolve("images/elementor-placeholder-image.png"));
})

router.get("/image", async (req, res) => {

})

export default router;
