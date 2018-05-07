"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIO = require('socket.io');
const userDAO_1 = require("../DAL/userDAO");
class Socket {
    static listen(server) {
        const io = socketIO(server);
        io.on('connection', function (socket) {
            socket.on('userLogout', (user) => {
                socket.broadcast.emit('userLogout', { user });
                const dao = new userDAO_1.UserDAO();
                dao.setOnline(user._id, false)
                    .then((result) => {
                    console.log(result);
                })
                    .catch((error) => {
                    console.log(error);
                });
            });
            socket.on('userLogin', (user) => {
                socket.broadcast.emit('userLogin', { user });
                const dao = new userDAO_1.UserDAO();
                dao.setOnline(user._id, true)
                    .then((nbreRows) => {
                    console.log(nbreRows);
                })
                    .catch((error) => {
                    console.log(error);
                });
            });
        });
    }
}
exports.Socket = Socket;
