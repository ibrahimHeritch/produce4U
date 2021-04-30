import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:9000");

export default socket
