var express = require("express");
var router = express.Router();

////TODO: make this function add a product
router.post("/", function (req, res, next) {
    database.executeQuery(
        `INSERT INTO product (id, name, description, product_type, quantity, price, rating, picture)
            value('1' `, req.body.productTitle + ', ' + req.body.description + ', ' + ', ' + req.body.selectProductCategory + ', ' +
                    req.body.quantity + ', ' + req.body.productPrice + `, '5.0', 'NULL')`
    );
});

module.exports = router;
