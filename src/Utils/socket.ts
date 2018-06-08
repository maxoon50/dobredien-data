import {User} from "../BO/User";

const socketIO = require('socket.io');
import {UserDAO} from "../DAL/userDAO";
import {UserManager} from "../BLL/UserManager";

export class Socket{


    static listen(server: any) {

        const io = socketIO(server);
        const userManager = new UserManager() ;

        io.on('connection', function (socket: any) {

            socket.on('userLogout', (user: any) => {
                socket.broadcast.emit('userLogout', {user});
                    console.log('logout');
                    console.log(user);
                    userManager.removeUser(user);
            });

            socket.on('userLogin', (user: any) => {
                socket.broadcast.emit('userLogin', {user});
                    console.log('login');
                    console.log(user);
                    userManager.addUser(user);
            });

        });
    }

}