var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

/*
*Returns a user
*/

router.get("/", function(req, res, next) {
    var firstJoin = "SELECT * FROM user LEFT JOIN address ON user.address_id = address.id"
    var secondJoin = "SELECT *, U.username as username FROM ("+firstJoin+") as U LEFT JOIN producer as P ON U.username = P.username WHERE U.username = '"+req.query.username+"';"
    database.executeQuery(secondJoin)
          .then(value => {
            if(value.result.length > 0){
              res.json(value.result[0])
            }else{
              return res.json(null)
          }})


});

router.post("/update/producerInfo", function(req, res, next) {
    var query = "UPDATE producer SET farm_name = '"+req.body.farm_name+"', description ='"+req.body.description+"' WHERE username = '"+req.body.username+"';"
    database.executeQuery(query)



});

router.post("/update/address", function(req, res, next) {
  if(req.body.address_id == null){
    var query1 =  `INSERT INTO
                    address (address_line_one,address_line_two,city,state,country,zip_code,latitude,longitude)
                    VALUE('`+req.body.address_line_one+`',
                      '`+req.body.address_line_two+`',
                      '`+req.body.city+`',
                      '`+req.body.state+`',
                      '`+req.body.country+`',
                      '`+req.body.zip_code+`',
                      '`+req.body.latitude+`',
                      '`+req.body.longitude+`'
                    );`

    var query2 =  "UPDATE user SET address_id = LAST_INSERT_ID() WHERE username='"+req.body.username+"';"

    database.executeQuery(query1).then(v => database.executeQuery(query2))
  }else{
    var query = `UPDATE address
                 SET address_line_one = '`+req.body.address_line_one+`',
                     address_line_two ='`+req.body.address_line_two+`',
                     city = '`+req.body.city+`',
                     state = '`+req.body.state+`',
                     country = '`+req.body.country+`',
                     zip_code = '`+req.body.zip_code+`',
                     longitude = '`+req.body.longitude+`',
                     latitude = '`+req.body.latitude+`'
                 WHERE id = `+req.body.address_id+`;`
    database.executeQuery(query)
  }




});

router.post("/update/profilePicture", function(req, res, next) {
    var query = "UPDATE user SET profile_picture='"+req.body.profile_picture+"' WHERE username = '"+req.body.username+"';"
    database.executeQuery(query)



});

module.exports = router;
