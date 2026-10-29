import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { genToken } from "../utils/Token.js"
import { sendOTPemail } from "../utils/Mail.js";

// Signup Controller
export const signUpController = async (req, res) => {
    try {
        const { fullname, email, password, mobile, role } = req.body;

        // Check whether the user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists!",
            });
        }

        // Validate password
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        // Validate mobile number
        if (!mobile || String(mobile).length < 10) {
            return res.status(400).json({
                message: "Mobile must be at least 10 digits",
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        user = await User.create({
            fullname,
            email,
            password: hashPassword,
            mobile,
            role,
        });

        // Generate token
        const token = await genToken(user._id);

        // Store token in cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        // });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Send response
        return res.status(201).json({
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
            message: "An error occurred during signup",
        });
    }
};

// Sing In Controller
export const signInController = async (req, res) => {
    try {
        const { email, password } = req.body
        //get the user details use with findOne method 
        const user = await User.findOne({ email })

        //if user exists then below function works
        if (!user) {
            return res.status(400).json({
                message: 'User does not exists!'
            })
        }

        // here check the password length
        if (password.length < 6) {
            return res.status(400).json({
                message: 'Password must be aleast 6 characters'
            })
        }

        // Password change to hash to normal password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid username or password'
            })
        }

        // token
        const token = await genToken(user._id)

        // token store to cookie
        // res.cookie('token', token, {
        //     secure: false, //devlopment then true
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60 * 1000,
        //     httpOnly: true
        // })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // final steps after signup 

        res.status(200).json(user)

    } catch (error) {
        console.log(`Getting some error on Signup ${error}`)
        return res.status(500).json({
            message: `Sign in error ${error}`
        })
    }
}

// logout Controller
export const logoutController = async (req, res) => {
    try {
        console.log('logout hit')
        res.clearCookie('token')
        return res.status(200).json({
            message: "Logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: `Logout Error ${error}`
        })
    }
}

// Send OTP Via email
export const sendOTPController = async (req, res) => {
    try {
        const { email } = req.body
        console.log('send otp', email)
        const user = await User.findOne({ email })
        console.log('send oppt user', user)
        if (!user) {
            return res.status(400).json({ message: 'User does not exist!' })
        }
        const OTP = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = OTP
        user.otpExpires = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()

        //send otp 
        await sendOTPemail(email, OTP)
        return res.status(200).json({
            message: "OTP sent successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: 'OTP sending is failed'
        })
    }
}

// verifyOTP
export const verifyOTP = async (req, res) => {
    try {
        const { email, Otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp !== Otp || user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: `Invalid or Expired OTP`
            })
        }
        user.resetOtp = undefined
        user.isOtpVerified = true
        user.otpExpires = undefined

        await user.save()

        return res.status(200).json({
            message: 'OTP verified successfully'
        })

    } catch (error) {
        console.log(`OTP is not verified`)
    }

}

// RESET Password
export const resetPassword = async (req, res) => {
    try {
        const { email, newpassword } = req.body

        const user = await User.findOne({ email })

        if (!user || !user.isOtpVerified) {
            return res.status(400).json("OTP verification required", error)
        }

        const hashPassword = await bcrypt.hash(newpassword, 10)

        user.password = hashPassword
        user.isOtpVerified = false
        await user.save()

        return res.status(200).json({
            message: "Password reset successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: `Reset Password error ${error} went wrong`
        })
    }
}

// Google Authentication Controller
export const googleAuthContrller = async (req, res) => {
    try {
        const { fullname, email, mobile, role } = req.body

        console.log('google auth res', req.body)
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({
                fullname,
                email,
                mobile,
                role
            })
        }

        // Generate token
        const token = await genToken(user._id);

        // Store token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        console.log(req.body)

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(`Google Auth error`, error)
    }
}