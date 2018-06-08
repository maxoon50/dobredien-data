import express = require('express');
let routerToken = express.Router();
const jwt = require('jsonwebtoken');
let config = require("../../config.json");

routerToken.use('*', (req, res, next) => {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secretToken , function(err: any) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Expired token'
                });
            } else {
                next();
            }
        });
    } else {
         if(req.method === 'OPTIONS'){
             return res.status(200).send();
         }
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

export {routerToken};