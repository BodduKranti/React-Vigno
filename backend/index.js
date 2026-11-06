import express from 'express'
import { ENV } from './src/config/ENV.js';
import { dbConnect } from './src/config/DB.js';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';

import cors from 'cors'
import shopRoutes from './src/routes/shop.route.js';
import shopItemrouts from './src/routes/shopitems.route.js';
import orderroute from './src/routes/order.route.js';


// http server
import http from 'http';
import { Server } from 'socket.io';
import { socketHandler } from './socket.js';



const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
});
app.set("io", io) // Set the io instance in the app object  



app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}))
app.set("trust proxy", 1);
app.use(express.json())//convert in to json
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRoutes)
app.use("/api/shop", shopRoutes)
app.use("/api/shop/shopitems", shopItemrouts)
app.use("/api/shop/order", orderroute)


// Socket.io connection handling
socketHandler(io);
server.listen(ENV.PORT, () => {
    dbConnect()
    console.log(`This server is running sds on ${ENV.PORT}`)
})