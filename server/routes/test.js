var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

//returns all rows in test table
router.get("/", function(req, res, next) {
    database.executeQuery("Select * From test;").then(value => {res.json(value);});

    //console.log(response);
});

//adds new row to test table;
router.post("/", function(req, res, next) {
    database.executeQuery("INSERT INTO test (value) VALUE ('" + req.body.value +"');");
});

module.exports = router;
