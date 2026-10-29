import express from 'express'
import { getCurrentUsercontroller } from '../controllers/user.controller.js'
import { isAuthMiddleWare } from '../middleware/isAuth.js'
const userRoutes = express.Router()

userRoutes.get(`/current_user`, isAuthMiddleWare, getCurrentUsercontroller)
export default userRoutes