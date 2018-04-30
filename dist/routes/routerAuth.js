"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userDAO_1 = require("../DAL/userDAO");
let routerAuth = express.Router();
exports.routerAuth = routerAuth;
routerAuth.post('/', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    dao.authenticate(req).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    });
});
