"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(pPseudo, pId, pOnline) {
        this._pseudo = pPseudo;
        this._id = pId;
        this._online = pOnline;
    }
    get pseudo() {
        return this._pseudo;
    }
    set pseudo(value) {
        this._pseudo = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get online() {
        return this._online;
    }
    set online(value) {
        this._online = value;
    }
}
exports.User = User;
