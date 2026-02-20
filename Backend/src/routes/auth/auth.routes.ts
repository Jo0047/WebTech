import { Router } from "express";
import * as authService from "./auth.service";

const router = Router();


/**
 * Post email and password. Password is compared with hashed password from DB. Returns the user email and isOwner
 */
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

/**
 * Post Registration Data and create a new User/Address and optional Restaurant in the DB
 */
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
        registrationData.restaurantPhoneNumber,
        registrationData.imageUrl,
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

/**
 * Get User by email
 */
router.get("/user/:email", async (req, res) => {
    const result = await authService.getUser(req.params.email);

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

/**
 * Get Address by street, streetNumber, Zipcode and City
 */
router.post("/address", async (req, res) => {
    let addressData = req.body

    const result = await authService.getAddress(
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

/**
 * Get all users
 */
router.get("/users", async (req, res) => {
    const result = await authService.getAllUsers();

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

/**
 * Get all addresses
 */
router.get("/addresses", async (req, res) => {
    const result = await authService.getAllAddresses();

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

router.post("/password-reset-request", async(req, res) => {
    let email = req.body.email;

    let result = await authService.sendPasswordResetEmail(email);

    if (result.success) {
        return res.status(200).json({
            message: result.message
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }

})

/**
 * GET /api/auth/verify-reset-token/:token
 */
router.get('/verify-reset-token/:token', async (req, res) => {

    const result = authService.verifyResetToken(req.params.token);

    if (result.success) {
        return res.status(200).json({
            email : result.email
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }

});

router.post('/password-reset', async (req, res) => {
    let token = req.body.token;
    let newPassword = req.body.newPassword;

    const result = await authService.resetPassword(token, newPassword);

    if (result.success) {
        return res.status(200).json({
            email: result.email
        });
    } else {
        return res.status(400).json({
            message: result.message
        });
    }


})

export default router;