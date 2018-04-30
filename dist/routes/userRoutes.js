"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userDAO_1 = require("../DAL/userDAO");
let routerUser = express.Router();
exports.routerUser = routerUser;
routerUser.get('/', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    dao.getAll().then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
    });
});
routerUser.post('/authenticate', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    dao.authenticate(req).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.send(error);
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
