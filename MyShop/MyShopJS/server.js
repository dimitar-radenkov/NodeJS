'use strict';

var http = require('http');
var port = 8000;

const handlers = require("./handlers"); //will search index.js by default

let environment = process.env.NODE_ENV || "development";
const config = require("./config/config");
const database = require("./config/database.config");

database(config[environment]);

http.createServer(
    function (req, res) {
        for (let h of handlers) {
            if (!h(req, res)) {
                break;
            }
        }

    })
    .listen(port);
