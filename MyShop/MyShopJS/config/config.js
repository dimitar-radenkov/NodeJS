"use strict";

const path = require("path");

module.exports = {
    development: {
        //rootPath = path.normalize(path.join(__dirname, "../"))
        connectionString: "mongodb://localhost:27017/ShopStopDatabase"
    },
    production: {

    }
}