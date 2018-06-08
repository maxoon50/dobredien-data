export class User {

 private _pseudo: string;
 private _id: number;
 private _online: boolean;
 private _connectionnbr: number;

    constructor(pPseudo: string,  pId: number, pOnline: boolean, connectionNbr: number= 1) {
     this._pseudo = pPseudo;
     this._id = pId;
     this._online = pOnline;
     this._connectionnbr = connectionNbr;
 }

    get pseudo(): string {
        return this._pseudo;
    }

    set pseudo(value: string) {
        this._pseudo = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get online(): boolean {
        return this._online;
    }

    set online(value: boolean) {
        this._online = value;
    }
    get connectionnbr(): number {
        return this._connectionnbr;
    }

    set connectionnbr(value: number) {
        this._connectionnbr = value;
    }

    addConnection() {
        this._connectionnbr++;
    }

    removeConnection() {
        this._connectionnbr--;
    }
}