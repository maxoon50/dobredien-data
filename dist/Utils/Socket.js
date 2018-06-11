"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require('socket.io');
const UserManager_1 = require("../BLL/UserManager");
class Socket {
    static listen(server) {
        const io = socketIO(server);
        const userManager = new UserManager_1.UserManager();
        io.on('connection', function (socket) {
            socket.on('userLogout', (user) => {
                socket.broadcast.emit('userLogout', { user });
                console.log('logout => ' + user);
                userManager.removeUser(user);
            });
            socket.on('userLogin', (user) => {
                socket.broadcast.emit('userLogin', { user });
                console.log('login => ' + user);
                userManager.addUser(user);
            });
        });
    }
}
exports.Socket = Socket;
