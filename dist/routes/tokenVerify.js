"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let routerToken = express.Router();
exports.routerToken = routerToken;
const jwt = require('jsonwebtoken');
let config = require("../../config.json");
routerToken.use('*', (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secretToken, function (err) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});
