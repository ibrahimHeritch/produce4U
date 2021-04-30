var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

router.get("/", function(req, res, next) {
    var query = "SELECT * FROM user "
    database.executeQuery(query)
          .then(value => {
            res.json(value)
          })


});

router.get("/messages", function(req, res, next) {
    var query = `SELECT *, DATE_FORMAT(send_datetime,'%m/%d/%y, %h:%i %p') AS nice_send_datetime
                  FROM message
                  WHERE (to_user="`+req.query.user1+`" AND from_user="`+req.query.user2+`") OR (to_user="`+req.query.user2+`" AND from_user="`+req.query.user1+`")
                  ORDER BY send_datetime DESC;`
    database.executeQuery(query)
          .then(value => {
            res.json(value)
          })


});
module.exports = router;
