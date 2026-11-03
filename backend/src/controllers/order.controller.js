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

        const filteredOrder = ownerOrder.map((order) => ({
            _id: order._id,
            deliveryAddress: order?.deliveryAddress,
            paymentMethod: order.paymentMethod,
            user: order.user,
            shopOrder: order.shopOrder.find(
                (o) => String(o.owner?._id) === String(req.userId)
            ),
            createdAt: order.createdAt
        }));

        console.log(' filteredOrder', filteredOrder)

        return res.status(200).json(filteredOrder);

    } catch (error) {
        console.error("Get owner order error:", error);

        return res.status(500).json({
            message: "Get owner order failed",
            error: error.message
        });
    }
};


export const updateOrderstatus = async (req, res) => {
    try {
        const { orderId, shopId } = req.params;
        const { status } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const shopOrder = order.shopOrder.find(
            (o) => String(o.shop) === String(shopId)
        );

        if (!shopOrder) {
            return res.status(404).json({
                message: "Shop order not found"
            });
        }

        shopOrder.status = status;

        // Save the parent order
        await order.save();

        // Return updated order with populated fields
        const updatedOrder = await Order.findById(orderId)
            .populate([
                { path: "user", select: "fullname email mobile" },
                { path: "shopOrder.shop", select: "name image" },
                { path: "shopOrder.owner", select: "fullname email mobile" },
                {
                    path: "shopOrder.shopOrderItems.item",
                    select: "name image price"
                }
            ]);

        return res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        return res.status(500).json({
            message: "Order status update error",
            error: error.message
        });
    }
};


export const user_owner_orderController = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        console.log('myorder user', user)
        if (user?.role === ' user') {
            const orders = await Order.find({ user: req.userId })
                .sort({ createdAt: -1 })
                .populate([
                    { path: "shopOrder.shop", select: "name image" },
                    { path: "shopOrder.owner", select: "fullname email mobile" },
                    { path: "shopOrder.shopOrderItems.item", select: "name image price" }
                ]);

            return res.status(200).json(orders)
        } else if (user?.role === 'owner') {
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

            const filteredOrder = ownerOrder.map((order) => ({
                _id: order._id,
                deliveryAddress: order?.deliveryAddress,
                paymentMethod: order.paymentMethod,
                user: order.user,
                shopOrder: order.shopOrder.find(
                    (o) => String(o.owner?._id) === String(req.userId)
                ),
                createdAt: order.createdAt
            }));

            console.log('filteredOrder', filteredOrder)

            return res.status(200).json(filteredOrder);
        }
    } catch (error) {
        return res.status(500).json({
            message: `Order getting error ${error}`,
            error: error.message
        });
    }
}