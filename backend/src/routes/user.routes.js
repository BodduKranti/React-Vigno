import express from 'express'
import { getCurrentUsercontroller, updateUserLocation } from '../controllers/user.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
const userRoutes = express.Router()

userRoutes.get(`/current_user`, isAuthMiddleWare, getCurrentUsercontroller)
userRoutes.put(`/userupdatelocation`, isAuthMiddleWare, updateUserLocation)

export default userRoutes