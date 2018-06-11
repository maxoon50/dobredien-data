import express = require('express');
import {UserDAO} from "../DAL/userDAO";
import {User} from "../BO/User";
import {UserManager} from "../BLL/UserManager";
let routerUser = express.Router();

//retourne tous les users
routerUser.get('/', function (req, res) {
    let dao  = new UserDAO();

    dao.getAll().then((result: User[]) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});

//retourne tous les users onlines
routerUser.get('/onlines', function (req, res) {
    let userManager = new UserManager();
    let listeUsersOnline = userManager.userList;
    res.send(JSON.stringify(listeUsersOnline));
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