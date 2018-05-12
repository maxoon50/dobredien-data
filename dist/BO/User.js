"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(pPseudo, pId, pOnline, connectionNbr = 1) {
        this._pseudo = pPseudo;
        this._id = pId;
        this._online = pOnline;
        this._connectionnbr = connectionNbr;
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
    get connectionnbr() {
        return this._connectionnbr;
    }
    set connectionnbr(value) {
        this._connectionnbr = value;
    }
    addConnection() {
        this._connectionnbr++;
    }
    removeConnection() {
        this._connectionnbr--;
    }
}
exports.User = User;
