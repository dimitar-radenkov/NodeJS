'use strict';

var http = require('http');
var port = 8000;

const handlers = require("./handlers"); //will search index.js by default

http.createServer(
    function (req, res) {
        for (let h of handlers) {
            if (!h(req, res)) {
                break;
            }
        }

    })
    .listen(port);
