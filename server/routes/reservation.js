var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

//returns all rows in test table
router.get("/", function(req, res, next) {
    database.executeQuery("Select *, DATE_FORMAT(pickup_datetime,'%d/%m/%Y %h:%i %p') AS niceDate From reservation ORDER BY pickup_datetime DESC;").then(value => {res.json(value);});


});

//adds new row to test table;
router.post("/", function(req, res, next) {

    //console.log("recived: "+req.body.name);
    database.executeQuery(
      `INSERT INTO reservation (pickup_datetime,reserver,order_status,item_id,quantity,price,producer_name,product_name)
                        VALUE (STR_TO_DATE('`+ req.body.date +`','%Y-%m-%d %h:%i %p'), 'test', 'CONFIRMED', 1,`+req.body.quantity+', '+req.body.total+ `, 'perdu farms','`+ req.body.name +`');`
     );
});

module.exports = router;
