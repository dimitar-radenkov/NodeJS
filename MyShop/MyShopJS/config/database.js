const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "/database.json");

function getProducts() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, "[]");
        return [];
    }

    let json = fs.readFileSync(dbPath).toString() || "[]";
    let products = JSON.parse(json);
    return products;
}


module.exports.products = {};

module.exports.products.getAll = getProducts;

module.exports.products.add = (product) => {
    let productList = getProducts();

    product.id = productList.length + 1;
    productList.push(product);

    let json = JSON.stringify(productList);
    fs.writeFileSync(dbPath, json);
}

module.exports.products.findByName = (name) => {
    let result = getProducts()
        .filter(p => p.name.toLowerCase().includes(name));

    return result;
}