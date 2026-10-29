
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/Token.js";
import { sendOTPemail } from "../utils/Mail.js";

// Shared cookie configuration for Netlify + Render
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
};

// Signup Controller
export const signUpController = async (req, res) => {
    try {
        const { fullname, email, password, mobile, role } = req.body;

        if (!fullname || !email || !password || !mobile) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        if (String(mobile).length < 10) {
            return res.status(400).json({
                success: false,
                message: "Mobile must be at least 10 digits",
            });
        }

        const existingUser = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        // Do not allow public users to assign privileged roles.
        const user = await User.create({
            fullname,
            email: email.trim().toLowerCase(),
            password: hashPassword,
            mobile,
            role: role === "user" ? "user" : "user",
        });

        console.log('user', user)

        const token = await genToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred during signup",
        });
    }
};

// Signin Controller
export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Signin error:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred during login",
        });
    }
};

// Logout Controller
export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            success: false,
            message: "Logout failed",
        });
    }
};

// Send OTP
export const sendOTPController = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        const OTP = Math.floor(
            1000 + Math.random() * 9000
        ).toString();

        user.resetOtp = OTP;
        user.otpExpires = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false;

        await user.save();
        await sendOTPemail(email, OTP);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error("Send OTP error:", error);

        return res.status(500).json({
            success: false,
            message: "OTP sending failed",
        });
    }
};

// Verify OTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, Otp } = req.body;

        const user = await User.findOne({
            email: email?.trim().toLowerCase(),
        });

        if (
            !user ||
            !user.resetOtp ||
            user.resetOtp !== String(Otp) ||
            !user.otpExpires ||
            user.otpExpires.getTime() < Date.now()
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        user.resetOtp = undefined;
        user.isOtpVerified = true;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error("Verify OTP error:", error);

        return res.status(500).json({
            success: false,
            message: "OTP verification failed",
        });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, newpassword } = req.body;

        if (!email || !newpassword || newpassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Provide an email and a password of at least 6 characters",
            });
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user || !user.isOtpVerified) {
            return res.status(400).json({
                success: false,
                message: "OTP verification required",
            });
        }

        user.password = await bcrypt.hash(newpassword, 10);
        user.isOtpVerified = false;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            success: false,
            message: "Password reset failed",
        });
    }
};

// Google Authentication Controller
export const googleAuthContrller = async (req, res) => {
    try {
        const { fullname, email, mobile } = req.body;

        if (!fullname || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required",
            });
        }

        let user = await User.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!user) {
            user = await User.create({
                fullname,
                email: email.trim().toLowerCase(),
                mobile,
                role: "user",
            });
        }

        const token = await genToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Google authentication successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Google authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Google authentication failed",
        });
    }
};
