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
                         *,
                         ( 3959
                          * acos( cos(radians(${req.query.latitude}))
                          * cos(  radians( latitude )   )
                          * cos(  radians( longitude ) - radians(${req.query.longitude}) )
                          + sin( radians(${req.query.latitude}) )
                          * sin( radians( latitude ) )
                    )
                   )
                   AS distance
                   FROM (
                   SELECT p.*, a.latitude, a.longitude
                   FROM (`+query+`) as p
                   INNER JOIN user as u
                   ON p.owner_username = u.username
                   INNER JOIN address as a
                   ON u.address_id = a.id) as c
                   HAVING distance < 25
                   ORDER BY distance
                   LIMIT 0 , 20;
                   `

    }
    database.executeQuery(query).then(value => {res.json(value);});
});

module.exports = router;
