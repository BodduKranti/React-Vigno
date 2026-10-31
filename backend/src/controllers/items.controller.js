import mongoose from "mongoose";
import Shop from "../models/shop.model.js";
import { ShopItems } from "../models/shopitems.model.js"
import { uploadCloudinary } from "../utils/Cloudinary.js";


export const createShopItems = async (req, res) => {
    try {

        const { name, category, foodtype, price } = req.body
        let image;
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }

        const shop = await Shop.findOne({ owner: req.userId })

        if (!shop) {
            return res.status(500).json({
                message: `Shop is not found`
            })
        }

        const shopItems = await ShopItems.create({
            name, category, foodtype, price,
            image: image,
            shop: shop._id
        })

        shop.items.push(shopItems?._id)
        await shop.save()
        await shop.populate([
            { path: "owner" },
            {
                path: "items",
                options: { sort: { updatedAt: -1 } },
            },
        ]);


        return res.status(200).json({
            data: shop,
            message: `Successfully created shop item`
        })

    } catch (error) {
        return res.status(500).json({
            message: `Create Item getting error ${error}`
        })
    }
}

export const editShopItems = async (req, res) => {
    try {
        const ItemId = req.params.itemId
        console.log('req.params', ItemId)
        const { name, category, foodtype, price } = req.body
        let image;
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }
        const shopItems = await ShopItems.findByIdAndUpdate(ItemId, {
            name, category, foodtype, price, image
        }, { new: true })

        if (!shopItems) {
            return res.status(400).json({
                message: `Shop item not found`
            })
        }

        const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })

        console.log('edti shop', shop)

        return res.status(200).json({
            data: shop,
            message: `Successfully updated shop item`
        })

    } catch (error) {
        return res.status(500).json({
            message: `Update Item getting error ${error}`
        })
    }
}

//get itesm by id
export const getShopItemsbyId = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = await ShopItems.findById(itemId)
        if (!item) {
            return res.status(400).json({
                message: `Item not found`
            })
        }
        return res.status(200).json(item)
    } catch (error) {
        return res.status(500).json({
            message: `The Shop item get by id error ${error}`
        })
    }
}

export const getShopItemscontroller = async (req, res) => {

}

export const deleteShopItemControler = async (req, res) => {
    try {
        const itemId = req.params.itemId

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({
                message: `Invalid item id`
            })
        }

        // find the logged owner shop
        const shop = await Shop.findOne({ owner: req.userId })
        console.log('shop delete', shop)



        if (!shop) {
            return res.status(400).json({
                message: "Shop is not found"
            })
        }

        const item = await ShopItems.findByIdAndDelete({ _id: itemId, shop: shop?._id })
        if (!item) {
            return res.status(400).json({
                message: 'Item not found'
            })
        }

        // 3. Remove the reference from the shop's items array
        await Shop.updateOne({ _id: shop._id }, { $pull: { items: item._id } });

        return res.status(200).json({
            data: item,
            message: `Item deleted successfully`
        })

    } catch (error) {
        return res.status(500).json({ Message: `Delete item error ${error}` })
    }
}

export const getshopItemsbyCity = async (req, res) => {
    try {
        const { city } = req.params

        if (!city) {
            return res.status(400).json({
                message: `City is not found`
            })
        }

        const shop = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, 'i') }
        }).populate([
            {
                path: 'items',
                options: { sort: { updatedAt: -1 } }
            }
        ])

        if (!shop) {
            return res.status(200).json({
                message: 'Shop not found'
            })
        }

        const shopIDs = shop.map((shop) => shop._id)
        const allCityItems = await ShopItems.find({ shop: { $in: shopIDs } }).sort({ createdAt: -1 });

        return res.status(200).json(allCityItems)

    } catch (error) {
        return res.status(500).json({
            message: `Shop items by city get error ${error}`
        })
    }
}

export const getCategoryItemsbyCategoryname = async (req, res) => {
    try {
        const cat = req.params.cat
        console.log('cat', cat)

        // shop data 
        const shop = await Shop.find({ owner: req.userId })
        console.log('shop cate', shop)


    }
    catch (error) {

    }
}