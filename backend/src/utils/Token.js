import jwt from "jsonwebtoken"
import { ENV } from "../config/ENV.js"

export const genToken = async (userId) => {

    try {
        const token = await jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" })
        return token
    } catch (error) {
        console.log(`Something worng with token ${error}`)
    }
}