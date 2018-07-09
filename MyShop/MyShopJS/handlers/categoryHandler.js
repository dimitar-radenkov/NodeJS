const url = require("url");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const Category = require("../models/Category");

module.exports.addGet = (req, res) => {
    res.render("category/add");
}

module.exports.addPost = (req, res) => {
    let category = req.body;
    Category
        .create(category)
        .then(() => {
            res.redirect("/");
        });
}