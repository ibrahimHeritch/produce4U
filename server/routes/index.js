var express = require('express');
var router = express.Router();

/* test if working */
router.get('/', function(req, res, next) {
  res.send( { status: 'Running' });
});

module.exports = router;
