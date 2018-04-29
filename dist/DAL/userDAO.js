"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../BO/User");
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
                            let user = new User_1.User(r.pseudo, r.password, r.id_user);
                            retval.push(user);
                        }
                        resolve(retval);
                    }
                    reject('not found');
                }).catch((error) => {
                    reject(error);
                });
            });
        };
        /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
        this.getById = (id) => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('id', id)
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
        this.insertOne = () => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('pseudo')
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
        this.remove = (id) => {
            return new Promise((resolve, reject) => {
                connexion(TABLE).where('id', id)
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
    }
    ;
}
exports.UserDAO = UserDAO;
