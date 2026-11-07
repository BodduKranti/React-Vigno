import jwt from "jsonwebtoken";
import User from "./src/models/user.model.js";

export const socketHandler = (io) => {
    // Authenticate once, at handshake
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token;
            if (!token) return next(new Error("Unauthorized"));
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = payload.id; // adjust to your token's field
            next();
        } catch {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", async (socket) => {
        console.log("A user connected:", socket.id, socket.userId);

        // Personal room: lets you emit to a user without storing socketId
        socket.join(`user:${socket.userId}`);

        try {
            await User.findByIdAndUpdate(socket.userId, {
                socketId: socket.id,
                isOnline: true,
            });
        } catch (error) {
            console.error("Error marking user online:", error);
        }

        socket.on("updateLocation", async ({ longitude, latitude, customerId } = {}) => {
            try {
                const lng = Number(longitude);
                const lat = Number(latitude);

                if (
                    !Number.isFinite(lng) || !Number.isFinite(lat) ||
                    lng < -180 || lng > 180 || lat < -90 || lat > 90
                ) {
                    return;
                }

                const user = await User.findByIdAndUpdate(
                    socket.userId,
                    {
                        location: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        isOnline: true,
                        socketId: socket.id,
                    },
                    { returnDocument: "after" }
                );

                if (user && customerId) {
                    // Only the relevant customer gets it
                    io.to(`user:${customerId}`).emit("locationUpdated", {
                        deliveryuserId: user._id,
                        longitude: lng,
                        latitude: lat,
                    });
                }
            } catch (error) {
                console.error("Error updating user location:", error);
            }
        });

        socket.on("disconnect", async () => {
            console.log("A user disconnected:", socket.id);
            try {
                // Matches on socketId, so an old socket's disconnect
                // won't mark a user offline after they reconnected
                await User.findOneAndUpdate(
                    { socketId: socket.id },
                    { socketId: null, isOnline: false }
                );
            } catch (error) {
                console.error("Error updating user on disconnect:", error);
            }
        });
    });
};