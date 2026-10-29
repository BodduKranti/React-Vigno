import express from 'express'
import {
    googleAuthContrller,
    logoutController,
    resetPassword,
    sendOTPController,
    signInController,
    signUpController,
    verifyOTP
} from '../controllers/auth.controller.js';


const authRouter = express.Router();

authRouter.post("/signup", signUpController)
authRouter.post("/login", signInController)
authRouter.get("/logout", logoutController)
authRouter.post("/sendotp", sendOTPController)
authRouter.post("/verifyotp", verifyOTP)
authRouter.post("/resetPassword", resetPassword)
authRouter.post("/googleauth", googleAuthContrller)

export default authRouter