import { Order } from "../models/order.model.js"
import Shop from "../models/shop.model.js"
import User from "../models/user.model.js"

export const placeOrderController = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body
        //cartitems
        if (cartItems.length === 0 || !cartItems) {
            return res.status(400).json({
                message: 'Cart is empty'
            })
        }

        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: `Send complete DeliveryAddress` })
        }


        // group items by shop
        const groupItemByShop = {}

        cartItems.forEach(item => {
            const shopId = item.shop
            if (!groupItemByShop[shopId]) {
                groupItemByShop[shopId] = []
            }
            groupItemByShop[shopId].push(item)
        })
        console.log('groupItemByShop order', groupItemByShop)

        //shop order
        const shopOrder = await Promise.all(Object.keys(groupItemByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")
            if (!shop) {
                return res.status(400).json({
                    message: 'Shop not found'
                })
            }
            const items = groupItemByShop[shopId]
            const subtotal = items.reduce((s, i) => s + Number(i.quantity) * Number(i.price), 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subTotal: subtotal,
                shopOrderItems: items.map((i) => {
                    return {
                        item: i._id,
                        name: i.name,
                        price: i.price,
                        quantity: i.quantity
                    }
                })
            }
        }))

        // Order
        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrder: shopOrder
        })


        return res.status(200).json(newOrder)


    } catch (error) {
        return res.status(500).json({
            message: `Create order getting error ${error}`
        })
    }
}

export const getMyOrder = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.userId })
            .sort({ createdAt: -1 })
            .populate([
                { path: "shopOrder.shop", select: "name image" },
                { path: "shopOrder.owner", select: "fullname email mobile" },
                { path: "shopOrder.shopOrderItems.item", select: "name image price" }
            ]);

        return res.status(200).json(orders)
    } catch (error) {
        return res.status(500).json({
            message: `User ordered getting error ${error}`
        })
    }
}

export const getOwnerOrder = async (req, res) => {
    try {
        const ownerOrder = await Order.find({
            "shopOrder.owner": req.userId
        })
            .sort({ createdAt: -1 })
            .populate([
                {
                    path: "user",
                    select: "fullname email mobile"
                },
                {
                    path: "shopOrder.shop",
                    select: "name"
                },
                {
                    path: "shopOrder.owner",
                    select: "fullname email mobile"
                },
                {
                    path: "shopOrder.shopOrderItems.item",
                    select: "name image price"
                }
            ]);

        return res.status(200).json(ownerOrder);

    } catch (error) {
        console.error("Get owner order error:", error);

        return res.status(500).json({
            message: "Get owner order failed",
            error: error.message
        });
    }
};

// export const getOwnerOrder = async (req, res) => {
//     try {

//         const ownerOrder = await Order.find({ "shopOrder.owner": req.userId })
//             .sort({ createdAt: -1 })
//             .populate([
//                 { path: "shopOrder.shop", select: "name" },
//                 { path: "User" },
//                 { path: "shopOrder.shopOrderItems.item", select: "name image price" }
//             ]);

//         return res.status(200).json(ownerOrder)

//     } catch (error) {
//         return res.status(500).json({ message: `Get owner order error ${error}` })
//     }
// }


// export const getMyOrder = async (req, res) => {
//     try {
//         const user = await User.findById(req.userId);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }

//         if (user.role === "user") {

//             const orders = await Order.find({
//                 user: req.userId
//             })
//                 .sort({ createdAt: -1 })
//                 .populate([
//                     { path: "shopOrder.shop", select: "name" },
//                     { path: "shopOrder.owner", select: "fullname email mobile" },
//                     {
//                         path: "shopOrder.shopOrderItems.item",
//                         select: "name image price"
//                     }
//                 ]);

//             return res.status(200).json(orders);
//         }

//         else if (user.role === "owner") {

//             const ownerOrders = await Order.find({
//                 "shopOrder.owner": req.userId
//             })
//                 .sort({ createdAt: -1 })
//                 .populate([
//                     { path: "user", select: "fullname email mobile" },
//                     { path: "shopOrder.shop", select: "name" },
//                     {
//                         path: "shopOrder.shopOrderItems.item",
//                         select: "name image price"
//                     }
//                 ]);

//             return res.status(200).json(ownerOrders);
//         }

//         return res.status(403).json({
//             message: "You are not authorized to access orders"
//         });

//     } catch (error) {
//         console.error("Get My Order Error:", error);

//         return res.status(500).json({
//             message: "Failed to fetch orders",
//             error: error.message
//         });
//     }
// };