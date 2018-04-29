"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userDAO_1 = require("../DAL/userDAO");
let routerUser = express.Router();
exports.routerUser = routerUser;
routerUser.get('/', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    dao.getAll().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('error : ' + error);
    });
});
/*
Renvoie un user, check selon le type d'argument (number ou string) si getById ou getByName
 */
routerUser.get('/:arg', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    let arg = req.params.arg;
    if (isNaN(arg)) {
        dao.getByPseudo(arg).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log('error : ' + error);
        });
    }
    else {
        dao.getById(arg).then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log('error : ' + error);
        });
    }
});
