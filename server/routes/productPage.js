var express = require("express");
var router = express.Router();
var database = require("../database/database.js");

//Adding
router.put('/:name', (req, res) => {
    res.send('Add Reservation' + req.params.id)
})

//Editing
router.get('/:name/edit', (req, res) => {
    res.send('Edit Reservation' + req.params.id)
})

//Deleting
router.delete('/:name', (req, res) => {
    res.send('Delete Reservation' + req.params.id)
})

module.exports = router;
