"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
let config = require("../../config.json");
class TokenProvider {
    constructor() {
    }
    static getToken(payload) {
        let token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),
            payload
        }, config.secretToken);
        return token;
    }
}
exports.TokenProvider = TokenProvider;
