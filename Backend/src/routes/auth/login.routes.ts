import { Router } from "express";
import * as loginService from "./login.service";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const response = await loginService.login(email, password);
    res.json({
        success: response.successful,
        is_owner: response.is_owner,
    });
});
export default router;