"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userDAO_1 = require("../DAL/userDAO");
const UserManager_1 = require("../BLL/UserManager");
let routerUser = express.Router();
exports.routerUser = routerUser;
//retourne tous les users
routerUser.get('/', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    dao.getAll().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});
//retourne tous les users onlines
routerUser.get('/onlines', function (req, res) {
    let userManager = new UserManager_1.UserManager();
    let listeUsersOnline = userManager.userList;
    res.send(JSON.stringify(listeUsersOnline));
});
/*
Renvoie un user, check selon le type d'argument (number ou string) si getById ou getByName
 */
routerUser.get('/:arg', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    let arg = req.params.arg;
    if (isNaN(arg)) {
        dao.getByPseudo(arg).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    }
    else {
        dao.getById(arg).then((result) => {
            res.send(result);
        }).catch((error) => {
            res.send(error);
        });
    }
});
