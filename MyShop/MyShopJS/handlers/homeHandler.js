"use strict";

const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const Product = require("../models/Product");

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === "/" && req.method === "GET") {
        var joined = path.join(__dirname, "../views/home/index.html");
        let filePath = path.normalize(joined);
        fs.readFile(filePath, (err, data) => {

            let contentType = { "Content-Type": "text/html" };

            if (err) {
                console.log(err);
                res.writeHead(404, contentType);
                res.write("404 not found !");
                res.end();
                return;
            }

            let queryData = qs.parse(url.parse(req.url).query);

            Product
                .find()
                .then((products) => {

                    if (queryData.query) {
                        products = products.filter(p => p.name.toLowerCase().includes(queryData.query))
                    }

                    let content = "";
                    for (let p of products) {
                        content +=
                            `<div class="product-card">
                                <img class="product-img" src="${p.image}">
                                <h2>${p.name}</h2>
                                <p>${p.description}</p>
                            </div>`;
                    }

                    let html = data.toString().replace("{{{content}}}", content);

                    res.writeHead(200, contentType);
                    res.write(html);
                    res.end()
                });
        });

    } else {
        return true;
    }
}