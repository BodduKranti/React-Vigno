import express from 'express'
import { getMyOrder, getOwnerOrder, placeOrderController } from '../controllers/order.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
const orderroute = express.Router()

orderroute.post('/place-order', isAuthMiddleWare, placeOrderController)
orderroute.get('/getMyOrder', isAuthMiddleWare, getMyOrder)
orderroute.get('/getOwnerOrder', isAuthMiddleWare, getOwnerOrder)

export default orderroute