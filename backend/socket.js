import User from "./src/models/user.model.js";

export const socketHandler = async (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);
        socket.on('identify', async ({ userId }) => {
            try {
                console.log('Identifying user with ID:', userId);
                const user = await User.findByIdAndUpdate(userId, {
                    socketId: socket.id,
                    isOnline: true
                }, { new: true });
            }
            catch (error) {
                console.error('Error identifying user:', error);
            }
        })


        socket.on('updateLocation', async ({ userId, longitude,
            latitude }) => {
            try {
                console.log('Updating location for user ID:', userId, 'to:', { longitude, latitude });

                const user = await User.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    isOnline: true,
                    socketId: socket.id
                }, { new: true });


                if (user) {
                    io.emit('locationUpdated', { deliveryuserId: user._id, longitude, latitude });
                }

            } catch (error) {
                console.error('Error updating user location:', error);
            }
        });

        // Handle disconnection
        socket.on('disconnect', async () => {
            console.log('A user disconnected:', socket.id);
            try {
                await User.findOneAndUpdate({ socketId: socket.id }, {
                    socketId: null,
                    isOnline: false
                });
            } catch (error) {
                console.error('Error updating user on disconnect:', error);
            }
        });
    })
}