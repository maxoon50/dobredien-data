"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserList_1 = require("../BO/UserList");
class UserManager {
    constructor() {
        this._userList = [];
    }
    get userList() {
        return UserList_1.UserList.Instance.userList;
    }
    addUser(pUser) {
        UserList_1.UserList.Instance.addUser(pUser);
    }
    removeUser(pUser) {
        UserList_1.UserList.Instance.removeUser(pUser);
    }
}
exports.UserManager = UserManager;
