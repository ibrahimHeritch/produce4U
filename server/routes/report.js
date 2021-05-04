var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

router.post("/", function (req, res, next) {
    var state = req.body
    console.log(state);
    database.executeQuery(
        `INSERT INTO report (message)
            value('`+ state.message + `')`
    );


});


router.get("/:ID", function (req, res, next) {
    database.executeQuery("SELECT * FROM report WHERE id=" + req.params.ID + ";").then(value => { if (value.length > 0) { res.json(value[0]) } else { res.json(null) } });


});

router.get("/", function (req, res, next) {
    database.executeQuery("SELECT * FROM report WHERE from_user='" + req.query.user + "';").then(value => { res.json(value); });


});

module.exports = router;
