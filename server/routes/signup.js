var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

//returns all rows in test table
router.get("/", function(req, res, next) {
    var user = JSON.parse(req.query.state)
    console.log(user);
    var passHash = "X'9fad5e9eefdfb449'" ////TODO: passwords are hardcoded, replace this with hash of real password
    var queries = [`INSERT INTO user (username,first_name,last_name,email,password,account_type)
                VALUE ('`+user.username+`','`+user.fname+`','`+user.lname+`','`+user.email+`',`+passHash+`,'`+user.userType+`');`]
    if(user.userType == "PRODUCER"){
      queries.push(`INSERT INTO producer (username,farm_name)
                  VALUE ('`+user.username+`','First Farm');`)
    }
    database.executeInsertQueries(queries).then(error => {res.json(error);})


});

//adds new row to test table;
router.post("/", function(req, res, next) {

    //console.log("recived: "+req.body.name);

});

module.exports = router;
