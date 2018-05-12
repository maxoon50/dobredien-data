"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    constructor() {
        this._userList = [];
    }
    get userList() {
        return this._userList;
    }
    adduserList(user) {
        this._userList.push(user);
    }
}
exports.UserManager = UserManager;
