var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
var sendNotification = require("../notificationService.js");
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
        `INSERT INTO product ( name, description, product_type, quantity, price, rating, picture, owner_username,pricing_type)
            value('`+ state.product_title + `', '` + state.description + `', '` + state.product_type + `', ` +
                    state.quantity + `, ` + state.price + `, `+state.rating+`, '`+state.picture_url+`', '`+state.owner_username+`' , '`+state.pricing_type+`')`
    );

    database.executeQuery(
      "SELECT * FROM follow WHERE producer = '"+state.owner_username+"';"
    ).then(
      value =>{
        value.result.map(
          (item)=>{
            sendNotification(item.username,{title:"New Product Avialable",text:state.owner_username+" Posted a new product: "+state.product_title, tag:"New Product"})
          }
        )
      }

    )


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
    database.executeQuery("SELECT * FROM product WHERE id="+req.params.ID+";").then(value => {if(value.result.length > 0){res.json({error:value.error,result:value.result[0]})}else{res.json(value)}});


});

router.get("/", function(req, res, next) {
    database.executeQuery("SELECT * FROM product WHERE owner_username='"+req.query.user+"';").then(value => {res.json(value);});


});

module.exports = router;
