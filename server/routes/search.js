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
      query= "SELECT * FROM ("+query+") as a WHERE name LIKE '%"+req.query.search+"%'"
    }


    if(req.query.latitude && req.query.latitude!="null" && req.query.longitude!="null"){
      console.log(req.query.latitude, req.query.longitude)
      var query = `SELECT
                         id,
                         ( 3959
                          * acos( cos(radians(${req.query.latitude}))
                          * cos(  radians( latitude )   )
                          * cos(  radians( longitude ) - radians(${req.query.longitude}) )
                          + sin( radians(${req.query.latitude}) )
                          * sin( radians( latitude ) )
                    )
                   )
                   AS distance
                   FROM product
                   HAVING distance < 25
                   ORDER BY distance
                   LIMIT 0 , 20;
                   FROM (
                   SELECT *
                   FROM product
                   INNER JOIN user
                   ON product.owner_username = user.username
                   INNER JOIN address
                   ON user.address_id = address.id`
      ///TODO: make this get the products near the abouve cordinates, but first you'd
      ////have to edit the first query to join product table with user and address since
      //// the product doesn't have cordinates by default.
    }
    database.executeQuery(query).then(value => {res.json(value);});
});

module.exports = router;
