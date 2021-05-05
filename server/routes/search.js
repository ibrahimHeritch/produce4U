var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

router.get("/", function(req, res, next) {
    if(req.query.product_type == "ALL"){
      var query = "SELECT * FROM product"
    }else{
      var query = "SELECT * FROM product WHERE product_type='"+req.query.product_type+"'"
    }
    //TODO: improve apone this

    if(req.query.search && req.query.search!="null"){
      query= "SELECT * FROM ("+query+") as a WHERE name = '"+req.query.search+"'"
    }
    database.executeQuery(query).then(value => {res.json(value);});

    if(req.query.lattitude && req.query.latitude!="null" && req.query.longitude!="null"){
      console.log(req.query.latitude, req.query.longitude)
      ///TODO: make this get the products near the abouve cordinates, but first you'd
      ////have to edit the first query to join product table with user and address since
      //// the product doesn't have cordinates by default.
    }

});

module.exports = router;
