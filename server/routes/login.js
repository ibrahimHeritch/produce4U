var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
const bcrypt = require('bcrypt');

/*
*Logs in user and return token
*/
router.get("/", function(req, res, next) {
    var query = "select * from user where username = '"+req.query.username+"';"
    ////TODO: Check password + return token
    database.executeQuery(query)
          .then(value => {
            if(value.length > 0){
              bcrypt.compare(req.query.password, value[0].password).then( isEqual => {
                if(isEqual){
                  res.json(value[0])
                }else{
                  res.json(null)
                }
              }

              )

            }else{
              return res.json(null)
          }})


});



module.exports = router;
