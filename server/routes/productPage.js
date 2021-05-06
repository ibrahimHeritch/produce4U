var express = require("express");
var router = express.Router();
var database = require("../database/database.js");


//Editing
router.post('/edit', (req, res) => {
  var state = req.body.state
  database.executeQuery(
      `Update product
       SET  name = "`+state.product_title+`" , description = "`+state.description+`" , product_type = "`+state.product_type+`" , quantity = `+state.quantity+`, price=`+state.price+` , picture= "`+state.picture_url+`" , pricing_type="`+state.pricing_type+`"
       WHERE id=`+req.body.id+`;
      `
  );
})

//Deleting THIS WON'T work until we drop the database and re init it.
router.post('/delete', (req, res) => {
    database.executeQuery("DELETE FROM products WHERE id="+req.body.id+";")
})

router.post('/add', (req, res) => {
    database.executeQuery("UPDATE product SET quantity = quantity + "+req.body.value+" WHERE id = "+req.body.id+";")
})

module.exports = router;
