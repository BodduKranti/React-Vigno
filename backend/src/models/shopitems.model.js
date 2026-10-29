import mongoose from "mongoose";


const shopItemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    },
    category: {
        type: String,
        enum: [
            "Snacks",
            "Main Course",
            "Desserts",
            "Pizza",
            "Biryani",
            "Burgers",
            "Sandwiches",
            "South Indian",
            "North Indian",
            "Chinese",
            "Fast Food",
            "Others"
        ],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    foodtype: {
        type: String,
        enum: ['veg', 'no-veg'],
        required: true
    },
    rating: {
        average: { type: Number, default: 0 },//average between users
        count: { type: Number, default: 0 }//user ratings
    }
}, {
    timestamps: true
})

export const ShopItems = mongoose.model('ShopItems', shopItemsSchema)