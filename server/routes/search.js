var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

router.get("/", function(req, res, next) {
    console.log(req.query.product_type)
    if(req.query.product_type == "ALL"){
      var query = "SELECT * FROM product;"
    }else{
      var query = "SELECT * FROM product WHERE product_type='"+req.query.product_type+"';"    }
    database.executeQuery(query).then(value => {res.json(value);});


});

module.exports = router;
