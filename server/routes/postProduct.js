var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
////TODO: make this function add a product
router.post("/", function (req, res, next) {
    var state = req.body
    database.executeQuery(
        `INSERT INTO product ( name, description, product_type, quantity, price, rating, picture, owner_username,pricing_type)
            value('`+ state.product_title + `', '` + state.description + `', '` + state.product_type + `', ` +
                    state.quantity + `, ` + state.price + `, `+state.rating+`, '`+state.picture_url+`', '`+state.owner_username+`' , '`+state.pricing_type+`')`
    );


});


router.get("/", function(req, res, next) {
    database.executeQuery("SELECT * FROM product WHERE owner_username='"+req.query.user+"';").then(value => {res.json(value);});


});

module.exports = router;
