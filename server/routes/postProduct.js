var express = require("express");
var router = express.Router();

////TODO: make this function add a product
router.post("/", function (req, res, next) {
    console.log(req.body);
});

module.exports = router;
