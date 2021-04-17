var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

//returns all rows in test table
router.get("/", function(req, res, next) {
    var query = "select * from user where username = '"+req.query.username+"';"
    ////TODO: Check password + return token
    database.executeQuery(query)
          .then(value => {
            if(value.length > 0){
            return res.json(value[0])
          }else{
            return res.json(null)
          }})


});



module.exports = router;
