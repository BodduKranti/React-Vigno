import dotenv from 'dotenv'
dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_API_URL: process.env.CLOUDINARY_API_URL
}