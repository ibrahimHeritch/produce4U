var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
const bcrypt = require('bcrypt');

/*
*Logs in user and return token
*/
router.get("/", function(req, res, next) {
    var query = "select * from user where username = '"+req.query.username+"';"
    ////TODO: return token
    database.executeQuery(query)
          .then(value => {
            if(value.result.length > 0){
              if(value.result[0].is_banned){
                res.json({error:"You are banned",result:null})
              }
              bcrypt.compare(req.query.password, value.result[0].password).then( isEqual => {
                if(isEqual){
                  res.json({error:"ALL OK",result:value.result[0]})
                }else{
                  res.json({error:"Wrong Password",result:null})
                }
              }

              )

            }else{
              return res.json({error:"Wrong Username",result:null})
          }})


});



module.exports = router;
