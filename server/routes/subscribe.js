var express = require("express");
var router = express.Router();
var database = require("../database/database.js");
const webpush = require("web-push");

const vapidKeys = {
  privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
  publicKey: "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8"
};

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);



router.post('/', (req, res) => {
  const subscriptionRequest = req.body.request;
  const subscription = JSON.stringify(subscriptionRequest);
  database.executeQuery("INSERT INTO subscription (username,subscription) VALUES ('"+req.body.username+"','"+subscription+"') ON DUPLICATE KEY UPDATE subscription='"+subscription+"';")

  res.status(201)
});


module.exports = router;
