import mongoose from 'mongoose'

const shopShcema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ShopItems"
        }]
    },
    {
        timestamps: true
    }
)

const Shop = mongoose.model('Shop', shopShcema)

export default Shop