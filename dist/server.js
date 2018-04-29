"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 3000;
const userDAO_1 = require("./DAL/userDAO");
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
app.get('/api/user/name/:name', function (req, res) {
    let dao = new userDAO_1.UserDAO();
    let pseudo = req.params.name;
    dao.getByPseudo(pseudo).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log('error : ' + error);
    });
});
app.listen(PORT, function () {
    console.log('server listening on port:' + PORT);
});
