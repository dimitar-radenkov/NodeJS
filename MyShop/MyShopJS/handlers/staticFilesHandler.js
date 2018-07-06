"use strict";

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

function getContentType(url) {

    let types = {
        "css": "text/css",
        "js": "text/javascript",
        "ico": "image/x-icon"
    };

    let extension = url
        .split(".")
        .pop();

    let result = types[extension];
    return result;
}

/**
 * /
 * @param {http.ClientRequest} req
 * @param {http.ClientResponse} res
 */
module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname.startsWith("/content/") && req.method === "GET") {
        let joined = path.join(__dirname, `..${req.pathname}`);
        let filePath = path.normalize(joined);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write("Resource not found");
                res.end();
                return;
            };

            res.writeHead(200, { "Content-Type": getContentType(req.pathname) });
            res.write(data);
            res.end();
        });

    } else {
        return true;
    }
}