import { v2 as cloudinary } from 'cloudinary'
import { ENV } from '../config/ENV.js'
import fs from 'fs'

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_SECRET_KEY
})

export const uploadCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file)
        return result.secure_url
    } catch (error) {
        console.log("Cloudinary error:", error)  // now you'll see the real reason
        throw error                              // let the controller send a 500
    } finally {
        if (fs.existsSync(file)) fs.unlinkSync(file)
    }
}