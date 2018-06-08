import express = require('express');
import {UserDAO} from "../DAL/userDAO";
import {User} from "../BO/User";
let routerAuth = express.Router();


routerAuth.post('/', function (req, res) {
    let dao  = new UserDAO();

    dao.authenticate(req).then((result: {user: User, token: any}) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

export {routerAuth};