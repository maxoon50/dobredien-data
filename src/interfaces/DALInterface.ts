export interface DALInterface<T>{
    insertOne : (T: any) => any
    remove: (arg: number)=> any
    update: (T: any)=>any
    getAll: ()=> Promise<T[]>
    getById : (arg: number)=> Promise<T>
}