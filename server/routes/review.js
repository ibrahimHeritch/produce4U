var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
const multer = require('multer')
var sendNotification = require("../notificationService.js");

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
        `INSERT INTO review ( author_username, text, product_id, rating, picture)
            value('`+ state.user.username + `', '` + state.text + `', '` + state.producer_reply + `', ` +
        state.product.product_id + `,  `+state.rating+`, '`+state.user.profile_picture+`')`
    );

    database.executeQuery(
      "SELECT * FROM product WHERE id = '"+state.product.product_id+"';"
    ).then(
      value =>{
        value.result.map(
          (item)=>{
            sendNotification(item.owner_username,{title:"New Review Avialable",text:state.user.username+" Posted a new review about: "+item.product_title, tag:"New Product"})
          }
        )
      }

    )
});


router.get("id/:ID", function(req, res, next) {
    database.executeQuery("SELECT * FROM review WHERE id="+req.params.ID+";").then(value => {if(value.result.length > 0){res.json({error:value.error,result:value.result[0]})}else{res.json(value)}});


});

router.get("/producer", function(req, res, next) {
    database.executeQuery("SELECT * FROM (review INNER JOIN product ON product_id=product.id) WHERE owner_username='"+req.query.producer+"';").then(value => {res.json(value);});


});


router.get("/product", function(req, res, next) {
    database.executeQuery("SELECT * FROM review WHERE product_id='"+req.query.product+"';").then(value => {res.json(value);});


});

module.exports = router;
