import express from 'express'
import { getMyOrder, getOwnerOrder, placeOrderController, updateOrderstatus, user_owner_orderController } from '../controllers/order.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
const orderroute = express.Router()

orderroute.post('/place-order', isAuthMiddleWare, placeOrderController)
orderroute.get('/getMyOrder', isAuthMiddleWare, getMyOrder)
orderroute.get('/getOwnerOrder', isAuthMiddleWare, getOwnerOrder)
orderroute.post('/order-status/:orderId/:shopId', isAuthMiddleWare, updateOrderstatus)
orderroute.get('/getuserOwenerOrder', isAuthMiddleWare, user_owner_orderController)
export default orderroute