"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(pPseudo, pId) {
        this._pseudo = pPseudo;
        this._id = pId;
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
}
exports.User = User;
