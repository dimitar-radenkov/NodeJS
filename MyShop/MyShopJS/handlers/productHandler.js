const url = require("url");
const http = require("http");
const database = require("../config/database");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");
const multipart = require("multiparty");
const shortid = require("shortid");


/**
 * /
 * @param {http.ClientRequest} req
 * @param {http.ClientResponse} res
 */
module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    if (req.pathname === "/product/add" && req.method === "GET") {
        let joined = path.join(__dirname, "../views/products/add.html");
        let filePath = path.normalize(joined);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);

                res.writeHead(404, { "Content-Type": "text/plain" });
                res.write(`Not found: ${filePath}`);
                res.end();
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    }
    else if (req.pathname === "/product/add" && req.method === "POST") {
        let form = new multipart.Form();

        let product = {};

        form.on('error', function (err) {
            console.log('Error parsing form: ' + err.stack);
        });

        form.on('part', function (part) {
            if (!part.filename) {
                // filename is not defined when this is a field and not a file
                part.setEncoding("utf-8");
                let field = "";
                part.on("data", (data) => {
                    field = data;
                });

                part.on("end", () => {
                    product[part.name] = field;
                })
            }

            if (part.filename) {
                // filename is defined when this is a file
                console.log('got file named ' + part.name);

                let dataString = "";
                part.setEncoding("binary");
                part.on("data", (data) => {
                    dataString = data;
                });

                part.on("end", () => {
                    let filename = shortid.generate();
                    let filepath = path.normalize(path.join(__dirname, `../content/images/${filename}`));
                    product[part.name] = filepath;

                    fs.writeFile(`${filepath}`, dataString, { encoding: "ascii" }, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            }
        });

        form.on("close", () => {
            database.products.add(product);
            res.writeHead(302, { Location: "/" });
            res.end();
        });

        // Parse req
        form.parse(req);
    }
    else {
        return true;
    }
}