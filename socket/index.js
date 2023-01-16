
const io = require('socket.io')(8800, {
    origins: 'http://localhost:3060' || 'http://77.76.185.75:3060',
})

let activeUsers = []

io.on('connection', (socket) => {

    socket.on('new-user-add', (newUserId) => {

        if (!activeUsers.some((user) => user.userId == newUserId)) {

            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        io.emit('get-users', activeUsers)
        console.log('Connected: ', activeUsers);
    })

    socket.on('send-message', (data) => {
        const { receiverId } = data
        const user = activeUsers.find(x => x.userId == receiverId)

        if (user) {
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    socket.on('disconnect', () => {
        activeUsers = activeUsers.filter(x => x.socketId != socket.id)
        io.emit('get-users', activeUsers)

        console.log('Disconnected: ', activeUsers);
    })

})