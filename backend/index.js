import express from 'express'
import { ENV } from './src/config/ENV.js';
import { dbConnect } from './src/config/DB.js';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';

import cors from 'cors'
import shopRoutes from './src/routes/shop.route.js';
import shopItemrouts from './src/routes/shopitems.route.js';


const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://192.168.31.167:3000'
];
app.use(cors({
    origin: [
        'http://192.168.31.167:3000',
        "http://localhost:5173",
        "http://localhost:3000",
        process.env.CLIENT_URL
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))

app.use(express.json())//convert in to json
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRoutes)
app.use("/api/shop", shopRoutes)
app.use("/api/shop/shopitems", shopItemrouts)

app.listen(ENV.PORT, () => {
    dbConnect()
    console.log(`This server is running on ${ENV.PORT}`)
})