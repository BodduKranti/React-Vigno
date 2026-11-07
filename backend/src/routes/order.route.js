import express from 'express'
import { acceptOrder, deliveryBoyEarning, getAssignmentOrderController, getCurrentOrder, getMyOrder, getOrderByID, getOwnerOrder, placeOrderController, RozarPaymentVerify, sendDeliveryyOTP, updateOrderstatus, user_owner_orderController, verifyDeliveryOTP } from '../controllers/order.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
const orderroute = express.Router()

orderroute.post('/place-order', isAuthMiddleWare, placeOrderController)
orderroute.post(`/verify-payment`, isAuthMiddleWare, RozarPaymentVerify)
orderroute.get('/getMyOrder', isAuthMiddleWare, getMyOrder)
orderroute.get('/getOwnerOrder', isAuthMiddleWare, getOwnerOrder)
orderroute.get('/getuserOwenerOrder', isAuthMiddleWare, user_owner_orderController)
orderroute.get('/get-assignment', isAuthMiddleWare, getAssignmentOrderController)
orderroute.get(`/get-current-oreder`, isAuthMiddleWare, getCurrentOrder)

orderroute.post('/send-deliveryOTP', isAuthMiddleWare, sendDeliveryyOTP)
orderroute.post('/verify-deliveryOTP', isAuthMiddleWare, verifyDeliveryOTP)

orderroute.post(`/acceptOrder/:assignmentId`, isAuthMiddleWare, acceptOrder)
orderroute.get('/getOrderByID/:orderId', isAuthMiddleWare, getOrderByID)
orderroute.post('/order-status/:orderId/:shopId', isAuthMiddleWare, updateOrderstatus)

orderroute.get('/todaydelivery', isAuthMiddleWare, deliveryBoyEarning)


//verifyDeliveryOTP , sendDeliveryyOTP
export default orderroute