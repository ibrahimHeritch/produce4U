var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' +file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file')

router.post("/", function (req, res, next) {
    var state = req.body
    database.executeQuery(
        `INSERT INTO review ( author_username, text, producer_reply, product_id, rating, picture)
            value('`+ state.author_username + `', '` + state.text + `', '` + state.producer_reply + `', ` +
        state.product_id + `,  `+state.rating+`, '`+state.picture_url+`')`
    );


});

router.post("/uploadImg", function (req, res, next) {


    upload(req, res, (err) => {
        if (err) {
            res.sendStatus(500);
        }
        res.send(req.file);
    });



});


router.get("/:ID", function(req, res, next) {
    database.executeQuery("SELECT * FROM review WHERE id="+req.params.ID+";").then(value => {if(value.result.length > 0){res.json({error:value.error,result:value.result[0]})}else{res.json(value)}});


});

router.get("/", function(req, res, next) {
    database.executeQuery("SELECT * FROM review WHERE author_username='"+req.query.user+"';").then(value => {res.json(value);});


});


router.get("/", function(req, res, next) {
    database.executeQuery("SELECT * FROM review WHERE product_id='"+req.query.product+"';").then(value => {res.json(value);});


});

module.exports = router;