"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    constructor() {
        this._userList = [];
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    get userList() {
        return this._userList;
    }
    addUser(pUser) {
        let isAlreadyOnline = false;
        this._userList.forEach((user, index, theArray) => {
            if (user['_id'] == pUser['_id']) {
                theArray[index]['_connectionnbr']++;
                isAlreadyOnline = true;
            }
        });
        if (!isAlreadyOnline) {
            this._userList.push(pUser);
        }
        console.log(this._userList);
    }
    removeUser(pUser) {
        let haveMultipleConnection = false;
        this._userList.forEach((user, index, theArray) => {
            if (user['_id'] == pUser['_id'] && user['_connectionnbr'] > 1) {
                theArray[index]['_connectionnbr']--;
                haveMultipleConnection = true;
            }
        });
        if (!haveMultipleConnection) {
            this._userList = this._userList.filter(user => {
                return user['_id'] != pUser['_id'];
            });
        }
        console.log(this._userList);
    }
}
exports.UserManager = UserManager;
