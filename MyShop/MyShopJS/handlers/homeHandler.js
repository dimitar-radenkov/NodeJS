"use strict";
const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");

module.exports.index = (req, res) => {
    let filePath = path.normalize(
        path.join(__dirname, "../views/home/index.html"));

    fs.readFile(filePath, (err, data) => {
        let contentType = { "Content-Type": "text/html" };

        if (err) {
            console.log(err);
            res.writeHead(404, contentType);
            res.write("404 not found !");
            res.end();
            return;
        }

        let queryData = req.query;

        Product
            .find()
            .then((products) => {

                if (queryData.query) {
                    products = products
                        .filter(p => p.name.toLowerCase()
                            .includes(queryData.query))
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
}