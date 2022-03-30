module.exports = {
    __init__: () => {
        io.on('connection', (socket) => {

            socket.on('IAMAVAILABEL', async (data) => {

                try {
                    if (!data || !data.token) return false;

                    const getUserFromToken = JWT.verify(data.token, CONFIG.JWT_KEY);
                    if (!getUserFromToken && getUserFromToken.user) return false
                    const user = await _Users.findById(getUserFromToken.user);
                    ONLINE_USERS[getUserFromToken.user] = socket.id;
                    socket.emit('WELCOME', { data: await _.authResponse(user) })
                } catch (error) {
                    console.log(error);
                }
            })

            socket.on('disconnect', () => {

                try {
                    if (Object.values(ONLINE_USERS).indexOf(socket.id) !== -1) {
                        var index = Object.values(ONLINE_USERS).indexOf(socket.id);
                        var customer = Object.keys(ONLINE_USERS)[index];
                        delete ONLINE_USERS[customer];
                    }
                } catch (error) {
                    console.log(error);
                }

            });
            socket.on('CHAT_MESSAGE_TO_USER', async (data) => {

                try {
                    const getUserFromToken = JWT.verify(data.token, CONFIG.JWT_KEY);
                    const user = await _Users.findById(getUserFromToken.user);
                    if (!user) return false;

                    // Save into Database
                    const messageData = {
                        user: user._id,
                        from: user._id,
                        to: data.to,
                        message: data.message,
                        type: data.type,
                        key: user._id + '_' + data.to
                    }

                    const saveMessage = await Model._create(_Chats, messageData);
                    if (!saveMessage) throw new Error('Oops! Message sending failed! Please try again.');

                    if (ONLINE_USERS[data.to]) {
                        io.to(ONLINE_USERS[data.to]).emit('CHAT_MESSAGE_FROM_SELLER', saveMessage);
                    }

                    socket.emit('CHAT_MESSAGE_RESPONSE', saveMessage)

                } catch (error) {
                    console.log('Error', error)
                }

            })

        });
    }
}
