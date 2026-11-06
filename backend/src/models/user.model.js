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
    },
    socketId: {
        type: String
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }   // [longitude, latitude]
    }
}, {
    timestamps: true
})
userModel.index({ location: `2dsphere` })
const User = mongoose.model("User", userModel)

export default User