var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
var sendNotification = require("../notificationService.js");

/////TODO: make it so that the user can only see their own reservations
//gets products for myReservations page
router.get("/", function(req, res, next) {
  if(req.query.user){

    database.executeQuery("Select *, DATE_FORMAT(pickup_datetime,'%m/%d/%Y %h:%i %p') AS niceDate From reservation WHERE reserver='"+req.query.user+"';").then(value => {res.json(value);});
  }else{

    database.executeQuery("Select *, DATE_FORMAT(pickup_datetime,'%m/%d/%Y %h:%i %p') AS niceDate From reservation WHERE producer_name='"+req.query.producer_name+"';").then(value => {res.json(value);});
  }

});

//adds new reservation to my reservations page
router.post("/", function(req, res, next) {
  sendNotification(req.body.user,{title:"Reservation Confirmed",text:"You reserved Product:"+req.body.name+" for "+req.body.date, image:req.body.picture, tag:"Reservation"})
  sendNotification(req.body.owner_username,{title:"Reservation Confirmed",text:"A customer reserved Product:"+req.body.name+" for "+req.body.date, image:req.body.picture, tag:"Reservation"})
    //console.log("recived: "+req.body.name);
    database.executeQuery(
      `INSERT INTO reservation (pickup_datetime,reserver,order_status,item_id,quantity,price,producer_name,product_name)
                        VALUE (STR_TO_DATE('`+ req.body.date +`','%Y-%m-%d %h:%i %p'), '`+req.body.user+`', 'CONFIRMED', `+req.body.id+`,`+req.body.order_quantity+', '+req.body.total+ `, '`+req.body.owner_username+`','`+ req.body.name +`');`
     );
     database.executeQuery(
       `UPDATE product
        SET quantity = quantity - `+req.body.order_quantity+`
        WHERE id=`+req.body.id+`;`
      );


});

module.exports = router;
