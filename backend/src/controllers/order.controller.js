
import Razorpay from 'razorpay'
import crypto from "crypto";
import DeliveryAssign from "../models/deliveryAssign.model.js"
import { Order } from "../models/order.model.js"
import Shop from "../models/shop.model.js"
import User from "../models/user.model.js"
import { ShopItems } from "../models/shopitems.model.js"
import { sendDeliveryOTPemail } from "../utils/Mail.js"
import { ENV } from '../config/ENV.js';


//ROZARPAY instance
let instance = new Razorpay({
    key_id: ENV.ROZAR_API_KEY,
    key_secret: ENV.ROZAR_SECRET_KEY,
});

export const placeOrderController = async (req, res) => {
    try {
        const {
            cartItems,
            paymentMethod,
            deliveryAddress,
            totalAmount
        } = req.body

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


        //PAymentmethod 
        if (paymentMethod === 'online') {
            //order create
            const razorOrder = await instance.orders.create({
                //user pay total
                amount: Math.round(totalAmount * 100),  //conver to rupyee to paise 
                currency: "INR",
                receipt: `receipt_${Date.now()}`//download the receipt
            })

            // Order
            const newOrder = await Order.create({
                user: req.userId,
                paymentMethod,
                deliveryAddress,
                totalAmount,
                shopOrder: shopOrder,
                razorpayOrderId: razorOrder?.id,
                payment: false,

                // razorpayPayment
                // payment
            })
            return res.status(200).json({
                razorOrder,
                orderId: newOrder._id,
                // key_id: ENV.ROZAR_API_KEY,
            })

        }

        // Order Cash on delivery
        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrder: shopOrder
        })


        //

        await newOrder.populate([
            {
                path: "shopOrder.shopOrderItems.item",
                select: "name image price"
            },
            {
                path: "shopOrder.shop",
                select: "name"
            }, {
                path: "shopOrder.owner",
                select: "fullname socketId"
            }, {
                path: "user",
                select: "fullname email mobile"
            }
        ])

        //socket implementation
        const io = req.app.get("io");
        if (io) {
            newOrder.shopOrder.forEach((shopOrder) => {
                const ownerSocketId = shopOrder.owner?.socketId;
                if (ownerSocketId) {
                    //perticular owner socket id emit the event
                    io.to(ownerSocketId).emit("newOrder", {
                        _id: newOrder._id,
                        deliveryAddress: newOrder?.deliveryAddress,
                        paymentMethod: newOrder.paymentMethod,
                        user: newOrder.user,
                        shopOrder: shopOrder,
                        createdAt: newOrder.createdAt,
                        payment: newOrder.payment
                    });
                }
            })
        }

        return res.status(200).json(newOrder)


    } catch (error) {
        return res.status(500).json({
            message: `Create order getting error ${error}`
        })
    }
}

//Online Payment Rozarpay
export const RozarPaymentVerify = async (req, res) => {
    try {
        // after click on the payment get the these details on the frontend
        // when click on the verify button then we send these details
        const { razorpay_payment_id, orderId } = req.body

        //payment check 
        const payment = await instance.payments.fetch(razorpay_payment_id)

        if (!payment || payment.status !== "captured") {

            return res.status(400).json({
                message: `Payment does not captured`
            })
        }

        const order = await Order.findById(orderId)

        if (!order) {
            return res.status(400).json({
                message: `Order not found`
            })
        }

        order.payment = true
        order.razorpayPaymentId = razorpay_payment_id
        await order.save()

        await order.populate([
            {
                path: "shopOrder.shopOrderItems.item",
                select: "name image price"
            },
            {
                path: "shopOrder.shop",
                select: "name"
            }, {
                path: "shopOrder.owner",
                select: "fullname socketId"
            }, {
                path: "user",
                select: "fullname email mobile"
            }
        ])

        //socket implementation
        const io = req.app.get("io");
        if (io) {
            order.shopOrder.forEach((shopOrder) => {
                const ownerSocketId = shopOrder.owner?.socketId;
                if (ownerSocketId) {
                    //perticular owner socket id emit the event
                    io.to(ownerSocketId).emit("newOrder", {
                        _id: order._id,
                        deliveryAddress: order?.deliveryAddress,
                        paymentMethod: order.paymentMethod,
                        user: order.user,
                        shopOrder: shopOrder,
                        createdAt: order.createdAt,
                        payment: order.payment
                    });
                }
            })
        }

        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({ message: `Payment verify getting error ${error}` })
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
                },
                {
                    path: "shopOrder.assignedDeliveryBoy",
                    select: "fullname email mobile"
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
            createdAt: order.createdAt,
            payment: order.payment
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

        let deliveryBoyPayload = [];

        if (status === 'out of delivery' && !shopOrder?.assignment) {
            const { latitude, longitude } = order?.deliveryAddress
            const nearbyDeliveryboys = await User.find({
                role: 'deliveryboy',
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [Number(latitude), Number(longitude)],
                            $maxDistance: 5000
                        }
                    }
                }
            })

            const nearbyUserids = nearbyDeliveryboys.map(b => b._id)

            const busyIds = await DeliveryAssign.find({
                assignedTo: { $in: nearbyUserids },
                status: { $nin: ['broadcasted', 'completed'] }
            }).distinct("assignedTo")

            //duplcation avoid below this
            // const busyIdSet = new Set(busyIds.map((id) => String(id)))
            const busyIdSet = new Set(busyIds.map(String));
            // Filter available delivery boys
            const availbelboys = nearbyDeliveryboys.filter((boy) => !busyIdSet.has(boy._id));

            console.log('availbelboys', availbelboys)

            deliveryBoyPayload = availbelboys.map((boy) => ({
                id: boy._id,
                fullName: boy.fullname,
                longitude: JSON.stringify(boy.location.coordinates[0]),
                latitude: JSON.stringify(boy.location.coordinates[1]),
                mobile: boy.mobile
            }));

            const candidates = availbelboys.map((b) => String(b._id))

            if (candidates?.length == 0) {
                await order.save()
                return res.status(400).json({ message: `There is no Delivery boy availble` })
            }
            //  console.dir('11090'.availbelboys[0].location, { depth: null });
            const deliveryAssignment = await DeliveryAssign.create({
                order: order?._id,
                shop: shopOrder?.shop,
                shopOrderId: shopOrder?._id,
                broadcastedTo: candidates,
                status: "broadcasted"
            })
            shopOrder.assignedDeliveryBoy = deliveryAssignment?.assignedTo
            shopOrder.assignment = deliveryAssignment?._id
            deliveryBoyPayload = availbelboys.map((b) => ({
                id: b._id,
                fullName: b?.fullname,
                longitude: JSON.stringify(b?.location?.coordinates?.[1]),
                latitude: JSON.stringify(b?.location?.coordinates?.[0]),
                mobile: b.mobile
            }))

        }

        //

        // Save the parent order
        // await shopOrder.save();
        await order.save();
        const updatedShopOrder = order.shopOrder.find(
            (o) => String(o.shop) === String(shopId)
        );
        // Return updated order with populated fields
        await order
            .populate([
                { path: "shopOrder.shop", select: "name image" },
                { path: "shopOrder.assignedDeliveryBoy", select: "fullname email mobile" },

                // { path: "shopOrder.owner", select: "fullname email mobile" },
                { path: "user", select: "socketId" },

                // { path: "shopOrder.assignedDeliveryBoy", select: "fullname email mobile" },
                // {
                //     path: "shopOrder.shopOrderItems.item",
                //     select: "name image price"
                // }
            ]);



        const io = req.app.get("io");
        if (io) {
            const ownerSocketId = order.user?.socketId;
            if (ownerSocketId) {
                io.to(ownerSocketId).emit("updateStatus", {
                    orderId: order._id,
                    shopId: updatedShopOrder?.shop?._id,
                    status: updatedShopOrder?.status,
                    userId: order.user?._id,
                });
            }
        }

        // return res.status(200).json(shopOrder.status);
        return res.status(200).json({
            shopOrder: updatedShopOrder,
            assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
            availbelboys: deliveryBoyPayload,
            assignment: updatedShopOrder?.assignment?._id
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

export const getAssignmentOrderController = async (req, res) => {
    try {
        const deliveryBoyId = req.userId;

        const assignments = await DeliveryAssign.find({
            broadcastedTo: deliveryBoyId,
            status: "broadcasted"
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "order",
                model: Order,
                populate: {
                    path: "shopOrder.shopOrderItems.item",
                    select: "name image price"
                }
            })
            .populate({ path: "shop", model: Shop, select: "name" })
            .lean();

        const seen = new Set();
        const formattedData = [];

        for (const a of assignments) {
            const shopOrder = a.order?.shopOrder?.find(
                (so) => String(so._id) === String(a.shopOrderId)
            );
            if (!shopOrder) continue;

            const key = `${a.order._id}-${a.shopOrderId}`;
            if (seen.has(key)) continue;
            seen.add(key);

            const items = (shopOrder.shopOrderItems ?? []).map((i) => ({
                _id: i._id,
                itemId: i.item?._id ?? i.item,        // populated doc or raw id
                name: i.name ?? i.item?.name,
                image: i.item?.image ?? null,         // adjust if your field is not "image"
                price: i.price,
                quantity: i.quantity
            }));

            const computedSubtotal = items.reduce(
                (sum, i) => sum + (Number(i.price) || 0) * (Number(i.quantity) || 0),
                0
            );

            formattedData.push({
                assignmentId: a._id,
                orderId: a.order._id,
                shopOrderId: a.shopOrderId,
                shopName: a.shop?.name,
                deliveryAdd: a.order.deliveryAddress,
                items,
                subtotal: shopOrder.subtotal ?? shopOrder.subTotal ?? computedSubtotal
            });
        }

        return res.status(200).json(formattedData);
    } catch (error) {
        return res.status(500).json({
            message: "Getting assignment order error",
            error: error.message
        });
    }
};

export const acceptOrder = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const riderId = req.userId;

        // rider must not already have an active delivery
        const alreadyAssigned = await DeliveryAssign.findOne({
            assignedTo: riderId,
            status: "assigned"
        });
        if (alreadyAssigned) {
            return res.status(400).json({ message: "You are already assigned to another order" });
        }

        // atomic: succeeds only if still open AND this rider was notified
        const assignment = await DeliveryAssign.findOneAndUpdate(
            { _id: assignmentId, status: "broadcasted", broadcastedTo: riderId },
            { $set: { assignedTo: riderId, status: "assigned", acceptedAt: new Date() } },
            { new: true }
        );

        if (!assignment) {
            return res.status(400).json({
                message: "Assignment not found, expired, or already taken"
            });
        }

        // set the rider on the matching shop order
        const result = await Order.updateOne(
            { _id: assignment.order, "shopOrder._id": assignment.shopOrderId },
            { $set: { "shopOrder.$.assignedDeliveryBoy": riderId } }
        );

        if (result.matchedCount === 0) {
            // roll back so the assignment isn't stuck as "assigned"
            await DeliveryAssign.updateOne(
                { _id: assignment._id },
                { $set: { status: "broadcasted", assignedTo: null }, $unset: { acceptedAt: 1 } }
            );
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
            message: "Order accepted",
            assignmentId: assignment._id,
            orderId: assignment.order
        });
    } catch (error) {
        return res.status(500).json({
            message: "Accept order error",
            error: error.message
        });
    }
};

export const getCurrentOrder = async (req, res) => {
    try {
        const assignment = await DeliveryAssign.findOne({
            assignedTo: req.userId,
            status: "assigned",
        })
            .populate([
                { path: "shop", model: Shop, select: "name image" },
                { path: "assignedTo", select: "fullname email mobile location" },
                {
                    path: "order",
                    model: Order,
                    populate: [
                        { path: "user", select: "fullname email mobile location" },
                        // shop name for every shopOrder
                        { path: "shopOrder.shop", model: Shop, select: "name" },
                        // image for every item inside every shopOrder
                        {
                            path: "shopOrder.shopOrderItems.item",
                            model: ShopItems,
                            select: "name image price",
                        },
                    ],
                },
            ])
            .lean();

        if (!assignment) {
            return res.status(404).json({ message: "No active delivery" });
        }
        if (!assignment.order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // the shop order that belongs to THIS assignment
        const shopOrder = assignment.order.shopOrder?.find(
            (so) => String(so._id) === String(assignment.shopOrderId)
        );
        if (!shopOrder) {
            return res.status(404).json({ message: "Shop order not found" });
        }

        const shopName = shopOrder.shop?.name ?? assignment.shop?.name ?? null;

        // items with image added
        const shopOrderItems = (shopOrder.shopOrderItems ?? []).map((i) => ({
            _id: i._id,
            item: i.item?._id ?? i.item,          // plain id, same as before
            name: i.name ?? i.item?.name,
            image: i.item?.image ?? null,         // change if your field is imageUrl / images[0]
            price: i.price,
            quantity: i.quantity,
            createdAt: i.createdAt,
            updatedAt: i.updatedAt,
        }));

        // locations (GeoJSON = [lng, lat])
        const deliveryBoylocation = { lat: null, lon: null };
        const coords = assignment.assignedTo?.location?.coordinates;
        if (Array.isArray(coords) && coords.length === 2) {
            deliveryBoylocation.lon = Number(coords[0]);
            deliveryBoylocation.lat = Number(coords[1]);
        }

        const customerLocation = { lat: null, lon: null };
        const addr = assignment.order.deliveryAddress;
        if (addr) {
            customerLocation.lat = Number(addr.latitude);
            customerLocation.lon = Number(addr.longitude);
        }

        return res.status(200).json({
            _id: assignment.order._id,
            assignmentId: assignment._id,
            user: assignment.order.user,
            shopOrder: {
                _id: shopOrder._id,
                shop: shopOrder.shop?._id ?? shopOrder.shop,   // plain id, same as before
                shopName,                                      // <-- shop name inside shopOrder
                owner: shopOrder.owner,
                subTotal: shopOrder.subTotal,
                status: shopOrder.status,
                assignment: shopOrder.assignment,
                assignedDeliveryBoy: shopOrder.assignedDeliveryBoy,
                shopOrderItems,                                // <-- each item has image
                createdAt: shopOrder.createdAt,
                updatedAt: shopOrder.updatedAt,
            },
            deliveryAddress: addr,
            deliveryBoylocation,
            customerLocation,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Current order error",
            error: error.message,
        });
    }
};

export const getOrderByID = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId)
            .populate([
                {
                    path: "user"
                },
                {
                    path: "shopOrder.shop",
                    model: Shop
                },
                {
                    path: "shopOrder.assignedDeliveryBoy",
                    model: User
                },
                {
                    path: "shopOrder.shopOrderItems.item",
                    model: ShopItems
                }
            ]).lean()

        if (!order) {
            return res.status(400).json({
                message: `Order not found`
            })
        }

        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({
            message: `Order getting error ${error}`
        })
    }
}

//mobile verify otp


export const sendDeliveryyOTP = async (req, res) => {
    try {
        const { orderId, shopOrderId } = req.body;

        const order = await Order.findById(orderId).populate("user", "fullname email");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrder.id(shopOrderId);
        if (!shopOrder) {
            return res.status(404).json({ message: "Shop order not found" });
        }

        // only the assigned delivery partner can trigger the OTP
        if (String(shopOrder.assignedDeliveryBoy) !== String(req.userId)) {
            return res.status(403).json({ message: "Not your delivery" });
        }

        if (shopOrder.status !== "out of delivery") {
            return res.status(400).json({ message: "Order is not out for delivery" });
        }

        // 4-digit OTP from a secure generator (1000-9999)
        const OTP = String(crypto.randomInt(1000, 10000));

        // store a hash, not the plain code
        shopOrder.deliveryOtp = crypto.createHash("sha256").update(OTP).digest("hex");
        shopOrder.otpExpires = new Date(Date.now() + 10 * 60 * 1000);   // now + 10 minutes
        shopOrder.otpAttempts = 0;

        await order.save();
        await sendDeliveryOTPemail(order.user, OTP, order._id);

        return res.status(200).json({
            message: `OTP sent successfully to ${order.user?.fullname}`
        });
    } catch (error) {
        return res.status(500).json({
            message: "OTP sending error",
            error: error.message
        });
    }
};

// Verify OTP

export const verifyDeliveryOTP = async (req, res) => {
    try {
        const { orderId, shopOrderId, OTP } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const shopOrder = order.shopOrder.id(shopOrderId);
        if (!shopOrder) {
            return res.status(404).json({ message: "Shop order not found" });
        }

        // only the assigned delivery partner can complete it
        if (String(shopOrder.assignedDeliveryBoy) !== String(req.userId)) {
            return res.status(403).json({ message: "Not your delivery" });
        }

        if (shopOrder.status === "delivered") {
            return res.status(400).json({ message: "Order already delivered" });
        }

        if (!shopOrder.deliveryOtp || !shopOrder.otpExpires || shopOrder.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP expired. Request a new one." });
        }

        if ((shopOrder.otpAttempts ?? 0) >= 5) {
            return res.status(429).json({ message: "Too many attempts. Request a new OTP." });
        }

        const hashed = crypto.createHash("sha256").update(String(OTP).trim()).digest("hex");
        if (hashed !== shopOrder.deliveryOtp) {
            shopOrder.otpAttempts = (shopOrder.otpAttempts ?? 0) + 1;
            await order.save();
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // success
        shopOrder.status = "delivered";
        shopOrder.deliverAt = new Date();
        shopOrder.deliveryOtp = null;
        shopOrder.otpExpires = null;
        shopOrder.otpAttempts = 0;
        shopOrder.assignment = null;        // add this line
        await order.save();

        await DeliveryAssign.deleteOne({
            order: orderId,
            shopOrderId,
            assignedTo: shopOrder?.assignedDeliveryBoy
        });

        return res.status(200).json({ message: "Order delivered successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Verify delivery OTP error",
            error: error.message
        });
    }
};

