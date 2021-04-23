var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

/*
*Returns a user
*/
router.get("/", function(req, res, next) {
    var query = "select * from user where username = '"+req.query.username+"';"

    database.executeQuery(query)
          .then(value => {
            if(value.length > 0){
              res.json(value[0])
            }else{
              return res.json(null)
          }})


});



module.exports = router;
