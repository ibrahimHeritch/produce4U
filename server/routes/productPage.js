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

//Deleting THIS WON'T work until we drop the database and re init it.
router.post('/delete', (req, res) => {
    database.executeQuery("DELETE FROM products WHERE id="+req.body.id+";")
})

module.exports = router;
