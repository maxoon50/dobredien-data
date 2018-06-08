import express = require('express');
import {UserDAO} from "../DAL/userDAO";
import {User} from "../BO/User";
let routerUser = express.Router();

routerUser.get('/', function (req, res) {
    let dao  = new UserDAO();

    dao.getAll().then((result: User[]) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});


/*
Renvoie un user, check selon le type d'argument (number ou string) si getById ou getByName
 */
routerUser.get('/:arg', function (req, res) {

    let dao  = new UserDAO();
    let arg: any= req.params.arg;

    if(isNaN(arg)) {
        dao.getByPseudo(arg).then((result: User) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    }else{
        dao.getById(arg).then((result: User) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    }

});

export {routerUser};