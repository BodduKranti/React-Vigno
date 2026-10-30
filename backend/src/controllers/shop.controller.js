import Shop from "../models/shop.model.js"
import { uploadCloudinary } from "../utils/Cloudinary.js"

// create shop
export const createShopController = async (req, res) => {
    try {
        console.log('content-type:', req.headers['content-type'])
        console.log('body:', req.body)
        console.log('file:', req.file)
        const { name, address, city, state } = req.body
        let image;
        if (req.file) {
            console.log('req.file', req.file)
            image = await uploadCloudinary(req.file.path)
        }
        // create the shop
        const shop = await Shop.create({
            name,
            address,
            city,
            state,
            image,
            owner: req.userId
        })

        //remove the owner from the object
        await shop.populate('owner')

        return res.status(200).json({ shop, message: `Shop created successfully` })

    } catch (error) {
        return res.status(500).json({
            message: `Create Shop is getting error ${error}`
        })
    }
}

//update shop
export const editShopController = async (req, res) => {
    try {
        const { name, address, city, state } = req.body
        let image;
        if (req.file) {
            image = await uploadCloudinary(req.file.path)
        }

        const shopId = await Shop.findOne({ owner: req.userId })

        // create the shop
        const shop = await Shop.findByIdAndUpdate(shopId?._id, {
            name: name,
            address: address,
            city: city,
            state: state,
            image: image,
            owner: req.userId
        }, {
            new: true
        })

        //remove the owner from the object
        await shop.populate('owner')

        return res.status(200).json({ shop, message: `Shop updated successfully` })

    } catch (error) {
        return res.status(500).json({
            message: `Updated Shop is getting error ${error}`
        })
    }
}

// delete shop
export const deleteShopController = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({
            message: `Delete shop getting error ${error}`
        })
    }
}

// get allshop
export const getAllShopController = async (req, res) => {
    try {
        console.log('get shop')
        const shop = await Shop.findOne({ owner: req.userId }).populate([
            { path: "owner" },
            {
                path: "items",
                options: { sort: { updatedAt: -1 } }
            }])
        if (!shop) {
            console.log('get shop not found')
            return res.status(500).json({ message: `There is no shop here` })
        }

        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({
            message: `Get my shops error ${error}`
        })
    }
}

// Get shop by city
export const getShopBycity = async (req, res) => {
    try {
        const { city } = req.params
        const shop = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate([{
            path: "items",
            options: { sort: { updatedAt: -1 } }
        }])

        if (!shop) {
            return res.status(400).json({
                message: `Shop is not found`
            })
        }

        return res.status(200).json(shop)
    } catch (error) {
        return res.status(500).json({
            message: `City api getting error ${error}`
        })
    }
}

//GEt shop by request the id
export const getShopByShopidcontroller = async (req, res) => {
    try {

        const shopId = req.params.shopId
        const shop = await Shop.findById(shopId).populate([{
            path: 'items',
            options: { sort: { updatedAt: -1 } }
        }])
        if (!shop) {
            return res.status(400).json({
                message: 'Shop is not found'
            })
        }
        console.log('shopbyid', shop)
        return res.status(200).json(shop)

    } catch (error) {
        return res.status(500).json({
            message: `Get shop by id getting error ${error}`
        })
    }
}
