let config = require("../../config.json");

let knexImpl = require('knex' ) ( {
    client :config.client,
    connection:{
        host : config.host,
        user: config.user,
        port: config.port,
        password: config.password,
        database: config.database,
    },

});

export = knexImpl;