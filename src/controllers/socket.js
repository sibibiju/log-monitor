const { Server } = require("socket.io");
const eventEmitter = require('./event');

const socketServer = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        console.log('a user connected');

        eventEmitter.on('loggedNewContent', (data) => {
            console.log(data);
            io.emit('logData', data);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        io.emit('conn', 'hello');

    });
}

module.exports = socketServer;