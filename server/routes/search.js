var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

router.get("/", function(req, res, next) {
    console.log()
    if(req.query.product_type == "ALL"){
      var query = "SELECT * FROM product;"
    }else{
      var query = "CHNAGE THIS" ////TODO cahnge this query to make it filter by product type.
    }
    database.executeQuery(query).then(value => {res.json(value);});


});

module.exports = router;
