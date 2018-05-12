"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require('socket.io');
class Socket {
    static listen(server) {
        const io = socketIO(server);
        io.on('connection', function (socket) {
            socket.on('userLogout', (user) => {
                socket.broadcast.emit('userLogout', { user });
                console.log('logout');
                console.log(user);
            });
            socket.on('userLogin', (user) => {
                socket.broadcast.emit('userLogin', { user });
                console.log('login');
                console.log(user);
            });
        });
    }
}
exports.Socket = Socket;
