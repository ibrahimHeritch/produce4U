var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
const bcrypt = require('bcrypt');
/*
*Adds new user to database
*/
router.get("/",  function(req, res, next) {
    var user = JSON.parse(req.query.state)

    bcrypt.hash(user.pass1, 10, function(err, hash) {
      console.log(typeof(hash))
      var queries = [`INSERT INTO user (username,first_name,last_name,email,password,account_type)
                  VALUE ('`+user.username+`','`+user.fname+`','`+user.lname+`','`+user.email+`','`+hash+`','`+user.userType+`');`]
      if(user.userType == "PRODUCER"){
        queries.push(`INSERT INTO producer (username,farm_name)
                    VALUE ('`+user.username+`','`+user.farm_name+`');`)
      }
      database.executeInsertQueries(queries).then(error => {res.json(error);})
    });



});


module.exports = router;
