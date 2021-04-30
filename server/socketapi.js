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
      io.sockets.emit('message:'+message.to_user,message)
    })
});


// end of socket.io logic

module.exports = socketapi;
