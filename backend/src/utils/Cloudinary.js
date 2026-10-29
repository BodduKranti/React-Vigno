import { v2 as cloudinary } from 'cloudinary'
import { ENV } from '../config/ENV.js';
import fs from 'fs'

export const uploadCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: ENV.CLOUDINARY_NAME,
        api_key: ENV.CLOUDINARY_API_KEY,
        api_secret: ENV.CLOUDINARY_SECRET_KEY
    });
    try {
        const result = await cloudinary.uploader.upload(file) // upload the file
        await fs.unlinkSync(file) //this is delete the file
        return result?.secure_url
    } catch (error) {
        fs.unlinkSync(file)
        console.log(error)
    }
}

