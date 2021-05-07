var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

router.post("/", function (req, res, next) {
    var state = req.body
    database.executeQuery(
        `INSERT INTO report (from_user,message)
            value('`+state.from_user+`','`+ state.message + `');`
    );


});


router.get("/:ID", function (req, res, next) {
    database.executeQuery("SELECT * FROM report WHERE id=" + req.params.ID + ";").then(value => { if (value.length > 0) { res.json(value[0]) } else { res.json(null) } });


});

router.get("/", function (req, res, next) {
    database.executeQuery("SELECT * FROM report;").then(value => { res.json(value); });


});

module.exports = router;
