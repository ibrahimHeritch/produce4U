var database = require("./database/database.js");
const webpush = require("web-push");


const vapidKeys = {
  privateKey: "bdSiNzUhUP6piAxLH-tW88zfBlWWveIx0dAsDO66aVU",
  publicKey: "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8"
};

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);


//A notification should look like this:
//{
//  title: "New Product Available ",
//  text: "HEY! Take a look at this brand new t-shirt!",
//  image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
//  tag: "new-product",
//  url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html"
//}
//

const  sendNotification = async function(user, notification){
  let subscriptionRequest = await database.executeQuery("SELECT subscription FROM subscription WHERE username='"+user+"';")
              .then((value)=>{
                if(value.length > 0){
                  return JSON.parse(value[0].subscription)
                }else{
                  return "error";
                }
              }).catch(err => console.log(err))
  console.log("sending notification to "+user)
  webpush
    .sendNotification(
      subscriptionRequest,
      JSON.stringify(notification)
    )
    .catch(err => {
      console.log(err);
    });
}

module.exports = sendNotification
