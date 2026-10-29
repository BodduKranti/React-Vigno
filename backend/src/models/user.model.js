import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'owner', 'deliveryboy'],
        required: true
    },
    resetOtp: {
        type: String,
    },
    isOtpVerified: {
        type: Boolean
    },
    otpExpires: {
        type: Date
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userModel)

export default User