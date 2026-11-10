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

// export const getShopBycity = async (req, res) => {
//     try {
//         const { city } = req.params

//         const filter = city
//             ? { city: { $regex: new RegExp(`^${escapeRegex(city)}$`, "i") } }
//             : {}

//         const shops = await Shop.find(filter)
//             .populate({
//                 path: "items",
//                 options: { sort: { updatedAt: -1 } }
//             })
//             .sort({ updatedAt: -1 })

//         return res.status(200).json(shops)
//     } catch (error) {
//         return res.status(500).json({
//             message: `City api getting error ${error}`
//         })
//     }
// }

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


// Get all shops with their items (no city filter)
export const getAllShopControllerold = async (req, res) => {
    try {
        const shops = await Shop.find({})
            .populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            })
            .sort({ updatedAt: -1 })

        if (!shops || shops.length === 0) {
            return res.status(404).json({ message: `No shops found` })
        }

        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({
            message: `Get all shops error ${error}`
        })
    }
}



// Get all shops with their items (no city filter)
export const getAllShopsWithItemsController = async (req, res) => {
    try {
        const shops = await Shop.find({})
            .populate({
                path: "items",
                options: { sort: { updatedAt: -1 } }
            })
            .sort({ updatedAt: -1 })

        if (!shops || shops.length === 0) {
            return res.status(404).json({ message: `No shops found` })
        }

        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({
            message: `Get all shops error ${error}`
        })
    }
}

//Get All cities
// Get all unique cities (optional search with ?q=del)
export const getAllCitiesController = async (req, res) => {
    try {
        const { q } = req.query

        const filter = q
            ? { city: { $regex: escapeRegex(q), $options: 'i' } }  // contains match
            : {}

        const cities = await Shop.distinct('city', filter)

        // clean, dedupe case-insensitively, sort A-Z
        const unique = [...new Map(
            cities
                .filter(Boolean)
                .map((c) => c.trim())
                .map((c) => [c.toLowerCase(), c])
        ).values()].sort((a, b) => a.localeCompare(b))

        return res.status(200).json(unique)
    } catch (error) {
        return res.status(500).json({
            message: `Get cities error ${error}`
        })
    }
}