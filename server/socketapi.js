const io = require( "socket.io" )();
const socketapi = {
    io: io
};
var database = require("./database/database.js");
// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    console.log( "A user connected" );
    socket.on('new message', (message) => {

      console.log('Recived Message: ', message)

      database.executeQuery(`INSERT INTO message (from_user, to_user, message, picture, send_datetime)
                              VALUE ("`+message.from_user+`", "`+message.to_user+`", "`+message.message+`", "`+message.picture+`", "`+message.send_datetime+`");`)
      database.executeQuery(`UPDATE chat
                             SET unread_messages = unread_messages+1
                             WHERE first_user="`+message.to_user+`" AND second_user="`+message.from_user+`";`)
      database.executeQuery(`SELECT SUM(unread_messages) total
                             FROM chat
                             WHERE first_user="`+message.to_user+`";`)
                             .then(value =>{
                                      io.sockets.emit('Unread Messages:'+message.to_user,(value.result[0].total?value.result[0].total:0))
                                      })
      io.sockets.emit('message:'+message.to_user,message)
    })

    socket.on('Request Unread Message', (user) => {

      console.log('Recived Request For Unread Message: ', user)


      database.executeQuery(`SELECT SUM(unread_messages) total
                             FROM chat
                             WHERE first_user="`+user+`";`)
                             .then(value =>{

                               io.sockets.emit('Unread Messages:'+user,(value.result[0].total?value.result[0].total:0))
                             })


    })
});


// end of socket.io logic

module.exports = socketapi;
