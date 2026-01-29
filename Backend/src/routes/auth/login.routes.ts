import { Router } from "express";
import * as authService from "./login.service";
import * as getService from "../general/get.service";

const router = Router();

router.get("/test", (req, res) => {
    console.log("Test route hit!");
    res.json({ message: "Auth router is working" });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if (result.success) {
        return res.status(200).json({
            email: result.email,
            isOwner: result.isOwner
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
});

router.post("/register", async (req, res) => {

    let registrationData = req.body;

    const result = await authService.register(
        registrationData.firstname,
        registrationData.lastname,
        registrationData.email,
        registrationData.password,
        registrationData.street,
        +registrationData.streetNumber,
        registrationData.city,
        +registrationData.zipCode,
        registrationData.restaurantName,
        registrationData.restaurantEmail,
        registrationData.restaurantPhoneNumber
    );

    if (result.success) {
        return res.status(200).json({
            email: result.email,
            isOwner: result.isOwner
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})


export default router;