import mongoose from "mongoose";


// which shop get the order items
const shopOrderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShopItems"
    },
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
    shopOrderItems: [shopOrderItemSchema]
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
    shopOrder: [shopOrderSchema]
}, { timestamps: true })

export const Order = mongoose.model('order', orderedSchema)