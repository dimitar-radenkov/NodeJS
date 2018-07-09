const homeHandler = require("./homeHandler");
const productHandler = require("./productHandler");
const categoryHandler = require("./categoryHandler");

module.exports = {
    home: homeHandler,
    product: productHandler,
    category: categoryHandler,
};