import express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const http = require('http');
import {routerUser} from './routes/userRoutes';
import {routerAuth} from './routes/routerAuth';
import {routerToken} from './routes/tokenVerify';
import {Socket} from "./Utils/socket";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(methodOverride());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept, X-Access-Token, Client-Security-Token');
    next();
});


app.use('/api/user/authenticate', routerAuth);
app.use('/api/*', routerToken);
app.use('/api/user', routerUser );

Socket.listen(server);

server.listen(PORT  , function () {
    console.log('server listening on port:' + PORT);
});