"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../BO/User");
const TokenProvider_1 = require("../Utils/TokenProvider");
let connexion = require('./knexImpl');
const TABLE = 'users';
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
                            let user = new User_1.User(r.pseudo, r.id_user, r.online);
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
                        let user = new User_1.User(r.pseudo, r.id_user, r.online);
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
                        let user = new User_1.User(r.pseudo, r.id_user, false);
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
                        let user = new User_1.User(r.pseudo, r.id_user, false);
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
                        let user = new User_1.User(r.pseudo, r.id_user, r.online());
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
                            let user = new User_1.User(r.pseudo, r.id_user, true);
                            const payload = { user };
                            resolve({ user: user, token: TokenProvider_1.TokenProvider.getToken(payload) });
                        }
                    }
                    reject({ error: 'not found' });
                }).catch((error) => {
                    reject({ error });
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        /*
        this function check on logout, if users still have another connections opened.
        if it is the case => call setJustOnline
         */
        this.setOnline = (id, online) => {
            if (online) {
                return new Promise((resolve, reject) => {
                    connexion(TABLE).where('id_user', id)
                        .update({
                        online,
                        'connectionnbr': connexion.raw('connectionnbr + 1')
                    })
                        .returning('*')
                        .then((result) => {
                        resolve(result[0]);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('id_user', id)
                    .decrement('connectionnbr', 1)
                    .update({
                    online,
                    'connectionnbr': connexion.raw('connectionnbr - 1')
                })
                    .returning('*')
                    .then((result) => {
                    if (result[0].connectionnbr > 0) {
                        console.log('il reste des users connectés!!');
                        result[0].online = true;
                    }
                    resolve(result[0]);
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.setJustOnline = (id) => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('id_user', id)
                    .update({
                    online: true
                })
                    .returning('*')
                    .then((result) => {
                    console.log('ok bb');
                    console.log(result);
                    resolve(result[0]);
                }).catch((error) => {
                    reject(error);
                });
            });
        };
    }
    ;
}
exports.UserDAO = UserDAO;
