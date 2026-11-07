import express from 'express'
import { createShopItems, deleteShopItemControler, editShopItems, getCategoryItemsbyCategoryname, getshopItemsbyCity, getShopItemsbyId, getShopItemscontroller, searchItems, userOrderRatingcontroller } from '../controllers/items.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
import { upload } from '../middleware/multer.js'

const shopItemrouts = express.Router()

shopItemrouts.post(`/createshopItems`, isAuthMiddleWare, upload.single("image"), createShopItems)
shopItemrouts.put(`/updateShopItems/:itemId`, isAuthMiddleWare, upload.single("image"), editShopItems)
shopItemrouts.get('/getAllshopItems', isAuthMiddleWare, getShopItemscontroller)
shopItemrouts.get(`/getItemById/:itemId`, isAuthMiddleWare, getShopItemsbyId)
shopItemrouts.delete(`/deleteItemById/:itemId`, isAuthMiddleWare, deleteShopItemControler)
shopItemrouts.get(`/getallitemsBycity/:city`, isAuthMiddleWare, getshopItemsbyCity)
shopItemrouts.get('/getcateitmeByCat/:cat', isAuthMiddleWare, getCategoryItemsbyCategoryname)
shopItemrouts.get('/searchItems', isAuthMiddleWare, searchItems)
shopItemrouts.post('/order-rating', isAuthMiddleWare, userOrderRatingcontroller)
export default shopItemrouts