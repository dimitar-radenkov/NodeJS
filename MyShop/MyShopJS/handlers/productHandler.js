const fs = require("fs");
const path = require("path");

const Product = require("../models/Product");
const Category = require("../models/Category");

module.exports.addGet = (req, res) => {
    let filePath = path.normalize(
        path.join(__dirname, "../views/products/add.html"));

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);

            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write(`Not found: ${filePath}`);
            res.end();
            return;
        }

        Category
            .find()
            .then((categories) => {

                let replacement = `<select class="input-field" name="category">`;
                for (var c of categories) {
                    replacement += `<option value="${c._id}">${c.name}</option>`
                }
                replacement += "</select>";

                let html = data.toString().replace("{categories}", replacement);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(html);
                res.end();
            });
    });
};

module.exports.addPost = (req, res) => {
    let productObj = req.body;
    productObj.image = "\\" + req.file.path;

    Product
        .create(product)
        .then((insertedProduct) => {
            Category.findById(product.category)
                .then(category => {
                    category.products.push(insertedProduct._id);
                    category.save();
                })
        });
    
    res.redirect("/");
};