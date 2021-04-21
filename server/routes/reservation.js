var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
/////TODO: make it so that the user can only see their own reservations
//gets products for myReservations page
router.get("/", function(req, res, next) {
    database.executeQuery("Select *, DATE_FORMAT(pickup_datetime,'%d/%m/%Y %h:%i %p') AS niceDate From reservation ORDER BY pickup_datetime DESC;").then(value => {res.json(value);});


});

//adds new reservation to my reservations page
router.post("/", function(req, res, next) {

    //console.log("recived: "+req.body.name);
    database.executeQuery(
      `INSERT INTO reservation (pickup_datetime,reserver,order_status,item_id,quantity,price,producer_name,product_name)
                        VALUE (STR_TO_DATE('`+ req.body.date +`','%Y-%m-%d %h:%i %p'), '`+req.body.user+`', 'CONFIRMED', 1,`+req.body.order_quantity+', '+req.body.total+ `, 'perdu farms','`+ req.body.name +`');`
     );
});

module.exports = router;
