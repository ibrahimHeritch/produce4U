var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
let socketapi = require("../socketapi");

router.get("/", function(req, res, next) {
    var query = "SELECT * FROM (SELECT * FROM chat WHERE first_user= '"+req.query.user+"' AND is_blocked = FALSE) u LEFT JOIN user on username = second_user;"
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
    database.executeQuery(`UPDATE chat
                           SET unread_messages = 0
                           WHERE first_user="`+req.query.user1+`" AND second_user="`+req.query.user2+`";`)
                           .then(value=>(console.log(value)))
    database.executeQuery(query)
          .then(value => {
            res.json(value)
          })


});

router.post("/new", function(req, res, next) {
    console.log("user1 " + req.body.user1 + " user2 "+req.body.user2)
    var query1 = `INSERT IGNORE INTO chat
                 (first_user, second_user)
                 VALUES
                 ('`+req.body.user1+`','`+req.body.user2+`');`
    var query2 = `INSERT IGNORE INTO chat
                 (first_user, second_user)
                 VALUES
                 ('`+req.body.user2+`','`+req.body.user1+`');`

    database.executeQuery(query1)
    database.executeQuery(query2)

    socketapi.io.sockets.emit('New Chat:'+req.body.user2,'')

});

router.post("/block", function(req, res, next) {
    var query1 = `UPDATE chat
                  SET is_blocked = TRUE
                  ON first_user = '`+req.body.user1+`';`


    database.executeQuery(query1)


});
module.exports = router;
