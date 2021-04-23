var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

/*
*Returns a user
*/
router.get("/", function(req, res, next) {
    var query = "SELECT * FROM user LEFT JOIN producer ON user.username = producer.username WHERE user.username = '"+req.query.username+"';"

    database.executeQuery(query)
          .then(value => {
            if(value.length > 0){
              res.json(value[0])
            }else{
              return res.json(null)
          }})


});

router.post("/update", function(req, res, next) {
    var query = "UPDATE producer SET farm_name = '"+req.body.farm_name+"', description ='"+req.body.description+"' WHERE username = '"+req.body.username+"';"
    database.executeQuery(query)



});

module.exports = router;
