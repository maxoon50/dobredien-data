import {DALInterface} from "../interfaces/DALInterface";
import {User} from "../BO/User";
import {TokenProvider} from "../Utils/TokenProvider";
let connexion = require('./knexImpl');
const TABLE = 'users';

export class UserDAO implements DALInterface<User> {

    constructor() {};

    getAll: () => Promise<User[]> = () => {
        return new Promise((resolve,reject)=>{
            connexion(TABLE)
                .then((result: any)=>{
                    if(result.length > 0){
                        let retval = [];
                        for(var i = 0; i<result.length; i++){
                            let r = result[i];
                            let user = new User(r.pseudo, r.id_user , r.online);
                            retval.push(user);
                        }
                        resolve(retval);
                    }
                    reject({error : 'not found'})
                }
                ).catch((error: any)=>{
                reject(error);
            })
        })
    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////

    getById: (arg: number) => Promise<User> = (id: number) => {
        return new Promise((resolve,reject)=>{
            connexion(TABLE).where('id_user', id)
                .then((result: any)=>{
                    if(result.length){
                        let r = result[0];
                        let user = new User(r.pseudo, r.id_user, r.online );
                        resolve(user);
                    }
                    reject({error : 'not found'})}
                ).catch((error: any)=>{
                reject(error);
            })
        })
    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////

    insertOne: (T: any) => any = () => {
        return new Promise((resolve,reject)=>{
            connexion(TABLE).where('pseudo')
                .then((result: any)=>{
                    if(result.length){
                        let r = result[0];
                        let user = new User(r.pseudo, r.id_user , false);
                        resolve(user);
                    }
                    reject({error : 'not found'})}
                ).catch((error: any)=>{
                reject(error);
            })
        })
    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////

    remove: (arg: number) => any = (id) => {
        return new Promise((resolve,reject)=>{
            connexion(TABLE).where('id', id)
                .then((result: any)=>{
                    if(result.length){
                        let r = result[0];
                        let user = new User(r.pseudo, r.id_user, false );
                        resolve(user);
                    }
                    reject({error : 'not found'})}
                ).catch((error: any)=>{
                reject(error);
            })
        })
    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////

    update: (T: any) => any = () => {

    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////

    getByPseudo: (arg: string) => Promise<User> = (pPseudo) => {
         return new Promise((resolve,reject)=>{
            connexion(TABLE).where('pseudo', pPseudo)
                .then((result: any)=>{
                    if(result.length){
                        let r = result[0];
                        let user = new User(r.pseudo, r.id_user, r.online() );
                        resolve(user);
                    }
                    reject('not found')}
                ).catch((error: any)=>{
                reject(error);
            })
        })
    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////

    authenticate: (request: any) => Promise<{user: User, token: any}> = (req) => {
        return new Promise((resolve,reject)=>{

            if(req.body.pseudo == null || req.body.password == null ){
                reject({error:'pseudo ou password non renseignés'});
            }

            connexion(TABLE).where('pseudo', req.body.pseudo)
                .then((result: any)=>{
                    if(result.length){
                        let r = result[0];
                        if(r.password == req.body.password){
                            let user = new User(r.pseudo, r.id_user , true);
                            const payload = {user};
                            resolve({user: user, token: TokenProvider.getToken(payload)});
                        }
                    }
                    reject({error : 'not found'})}
                ).catch((error: any)=>{
                    reject({error});
            })
        })
    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////
/*
this function check on logout, if users still have another connections opened.
if it is the case => call setJustOnline
 */
    setOnline: (idUser: number, online: boolean) => Promise<User> = (id, online) => {
        if (online) {
            return new Promise( (resolve, reject) => {
                connexion(TABLE).where('id_user', id)
                    .update({
                        online,
                        'connectionnbr': connexion.raw('connectionnbr + 1')
                    })
                    .returning('*')
                    .then((result: any)=>{
                        resolve(<User>result[0]);
                    }).catch((error: any)=>{
                    reject(error);
                })
            });
        }
        return new Promise( (resolve, reject) => {
            connexion(TABLE).where('id_user', id)
                .decrement('connectionnbr', 1)
                .update({
                    online,
                    'connectionnbr': connexion.raw('connectionnbr - 1')
                })
                .returning('*')
                .then((result: User[])=>{
                    if (result[0].connectionnbr > 0) {
                        console.log('il reste des users connectés!!');
                        result[0].online= true;
                    }
                        resolve(<User>result[0]);


                }).catch((error: any)=>{
                reject(error);
            })
        });

    };

    /////////// /////////// /////////// /////////// /////////// /////////// /////////// /////////// ///////////


    setJustOnline: (idUser: number) => Promise<User> = (id) => {

            return new Promise( (resolve, reject) => {
                connexion(TABLE).where('id_user', id)
                    .update({
                        online: true
                    })
                    .returning('*')
                    .then((result: any)=>{
                        console.log('ok bb');
                        console.log(result);
                        resolve(<User>result[0]);
                    }).catch((error: any)=>{
                    reject(error);
                })
            });
        };

}