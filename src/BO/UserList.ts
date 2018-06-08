import {UserManager} from "../BLL/UserManager";
import {User} from "./User";

export class UserList {


    private static _instance: UserList;
    private _userList: User[] = [];
    private constructor() {}

    public static get Instance() {
        return this._instance || (this._instance = new this() );
    }


    get userList(): User[] {
        return this._userList;
    }

    set userList(value: User[]) {
        this._userList = value;
    }

    addUser(pUser: any) {
        let isAlreadyOnline = false;

        this._userList.forEach((user, index, theArray) => {
            if(user['_id'] == pUser['_id']){
                theArray[index]['_connectionnbr']++;
                isAlreadyOnline = true;
            }
        });

        if(!isAlreadyOnline) {
            this._userList.push(pUser);
        }
        console.log(this._userList);
    }

    removeUser(pUser: any) {
        let haveMultipleConnection = false;

        this._userList.forEach((user, index, theArray) => {
            if(user['_id'] == pUser['_id'] && user['_connectionnbr'] > 1){
                theArray[index]['_connectionnbr']--;
                haveMultipleConnection = true;
            }
        });

        if(!haveMultipleConnection){
            this._userList = this._userList.filter(user => {
                return user['_id'] != pUser['_id'];
            });
        }
        console.log(this._userList);
    }
}