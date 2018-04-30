"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../BO/User");
const jwt = require('jsonwebtoken');
let connexion = require('./knexImpl');
const TABLE = 'users';
let config = require("../../config.json");
class UserDAO {
    constructor() {
        this.getAll = () => {
            return new Promise((resolve, reject) => {
                connexion(TABLE)
                    .then((result) => {
                    if (result.length > 0) {
                        let retval = [];
                        for (var i = 0; i < result.length; i++) {
                            let r = result[i];
                            let user = new User_1.User(r.pseudo, r.password, r.id_user);
                            retval.push(user);
                        }
                        resolve(retval);
                    }
                    reject({ error: 'not found' });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.getById = (id) => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('id_user', id)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let user = new User_1.User(r.pseudo, r.password, r.id_user);
                        resolve(user);
                    }
                    reject({ error: 'not found' });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.insertOne = () => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('pseudo')
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let user = new User_1.User(r.pseudo, r.password, r.id_user);
                        resolve(user);
                    }
                    reject({ error: 'not found' });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.remove = (id) => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('id', id)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let user = new User_1.User(r.pseudo, r.password, r.id_user);
                        resolve(user);
                    }
                    reject({ error: 'not found' });
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.update = () => {
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.getByPseudo = (pPseudo) => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('pseudo', pPseudo)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        let user = new User_1.User(r.pseudo, r.password, r.id_user);
                        resolve(user);
                    }
                    reject('not found');
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.authenticate = (req) => {
            return new Promise((resolve, reject) => {
                if (req.body.pseudo == null || req.body.password == null) {
                    reject({ error: 'pseudo ou password non renseignés' });
                }
                connexion(TABLE).where('pseudo', req.body.pseudo)
                    .then((result) => {
                    if (result.length) {
                        let r = result[0];
                        if (r.password == req.body.password) {
                            let user = new User_1.User(r.pseudo, r.password, r.id_user);
                            const payload = { user: user };
                            let token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                payload
                            }, config.secretToken);
                            resolve({ user: user, token: payload });
                        }
                    }
                    reject({ error: 'not found' });
                }).catch((error) => {
                    reject({ error });
                });
            });
        };
    }
    ;
}
exports.UserDAO = UserDAO;
