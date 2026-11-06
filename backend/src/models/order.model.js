import mongoose from "mongoose";


// which shop get the order items
const shopOrderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShopItems"
    },
    name: String,
    price: Number,
    quantity: Number
}, {
    timestamps: true
})

// Which shop get order
const shopOrderSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subTotal: {
        type: Number
    },
    shopOrderItems: [shopOrderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'preparing', 'out of delivery', 'delivered'],
        default: 'pending'
    },
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryAssign',
        default: null
    },
    assignedDeliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    deliveryOtp: {
        type: String,
        default: null
    },

    otpExpires: {
        type: Date,
        default: null
    },
    deliverAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})


// Order 

const orderedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    paymentMethod: {
        type: String,
        enum: ['cod', 'online'],
        required: true
    },
    deliveryAddress: {
        text: String,
        latitude: Number,
        longitude: Number
    },
    totalAmount: {
        type: Number,
    },
    shopOrder: [shopOrderSchema],
    payment: {
        type: Boolean,
        default: false
    },
    razorpayOrderId: {
        type: String,
        default: ''
    },
    razorpayPaymentId: {
        type: String,
        default: ''
    }
}, { timestamps: true })

export const Order = mongoose.model('order', orderedSchema)