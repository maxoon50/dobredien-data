import {User} from "../BO/User";
import {UserList} from "../BO/UserList";

export class UserManager {


    private _userList: User[] = [];
    public constructor() {}

    get userList(): User[] {
       return UserList.Instance.userList;
    }

    addUser(pUser: any) {
        UserList.Instance.addUser(pUser);
    }

    removeUser(pUser: any) {
        UserList.Instance.removeUser(pUser);
    }

}