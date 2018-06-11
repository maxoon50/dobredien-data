const jwt = require('jsonwebtoken');
let config = require("../../config.json");

export class TokenProvider {

    constructor() {
    }

    static getToken (payload : any) {
        let token = jwt.sign(
            {exp: Math.floor(Date.now() / 1000) + ( 60 * 60 ),
                payload
            }, config.secretToken);
        return token;
    }
}