import express from 'express'
import { createShopController, editShopController, getAllShopController, getShopBycity } from '../controllers/shop.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
import { upload } from '../middleware/multer.js'
const shopRoutes = express.Router()

shopRoutes.post(`/createshop`, isAuthMiddleWare, upload.single("image"), createShopController)
shopRoutes.put('/editshop', isAuthMiddleWare, upload.single("image"), editShopController)
shopRoutes.get('/getmyshop', isAuthMiddleWare, getAllShopController)
shopRoutes.get('/getshopbycity/:city', isAuthMiddleWare, getShopBycity)

export default shopRoutes