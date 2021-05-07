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

router.get("/all", function(req, res, next) {

    var query = "SELECT * FROM user WHERE is_banned = FALSE;"
    database.executeQuery(query)
    .then(value => {
      res.json(value)
    })

});

router.post("/update/producerInfo", function(req, res, next) {
    var query = "UPDATE producer SET farm_name = '"+req.body.farm_name+"', description ='"+req.body.description+"' WHERE username = '"+req.body.username+"';"
    database.executeQuery(query)
    .then(value => {
      res.json(value)
    })


});

router.get("/isFollowing", function(req, res, next) {
    var query = "SELECT * FROM follow WHERE username='"+req.query.username+"'AND producer='"+req.query.producer+"';"
    database.executeQuery(query)
    .then(value =>{
      res.json(value.results.length>0)
    })

});

router.post("/follow", function(req, res, next) {
    var query = "INSERT INTO follow (username,producer) VALUES ('"+req.body.username+"','"+req.body.producer+"');"
    database.executeQuery(query)

});

router.post("/unfollow", function(req, res, next) {
    `DELETE FROM reservation WHERE id=`+req.body.id+`;`
    var query = "DELETE FROM follow WHERE username='"+req.body.username+"'AND producer='"+req.body.producer+"';"
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

router.post("/ban", function(req, res, next) {
    var query1 = `UPDATE user
                  SET is_banned = TRUE
                  WHERE username = '`+req.body.user+`';`


    database.executeQuery(query1)


});

module.exports = router;
