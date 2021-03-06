"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const http = require('http');
const userRoutes_1 = require("./routes/userRoutes");
const routerAuth_1 = require("./routes/routerAuth");
const tokenVerify_1 = require("./routes/tokenVerify");
const socket_1 = require("./Utils/socket");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(methodOverride());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept, X-Access-Token, Client-Security-Token');
    next();
});
app.use('/api/user/authenticate', routerAuth_1.routerAuth);
app.use('/api/*', tokenVerify_1.routerToken);
app.use('/api/user', userRoutes_1.routerUser);
socket_1.Socket.listen(server);
server.listen(PORT, function () {
    console.log('server listening on port:' + PORT);
});
