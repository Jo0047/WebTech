import * as getService from "../get/get.service";
import {Router} from "express";
import * as authService from "../auth/login.service";

const router = Router();


router.get("/users", async (req, res) => {
    const result = await getService.getAllUsers();

    if (result.success) {
        return res.status(200).json({
            users: result.users
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})

router.get("/addresses", async (req, res) => {
    const result = await getService.getAllAddresses();

    if (result.success) {
        return res.status(200).json({
            user: result.addresses
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})

router.get("/restaurants", async (req, res) => {
    const result = await getService.getAllRestaurants();

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

router.get("/user/:email", async (req, res) => {
    const result = await getService.getUser(req.params.email);

    if (result.success) {
        return res.status(200).json({
            user: result.user
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})

router.post("/address", async (req, res) => {
    let addressData = req.body

    const result = await getService.getAddress(
        addressData.street,
        +addressData.streetNumber,
        +addressData.zipCode,
        addressData.city,
    );

    if (result.success) {
        return res.status(200).json({
            address: result.address
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }
})



export default router;