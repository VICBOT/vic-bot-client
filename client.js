const five = require("johnny-five");
const socket = require("socket.io-client")("http://localhost");
// const board = new five.Board()

// board.on("ready")

socket.on("connect", () => console.log("HELLO"));

socket.on("board", data => {
  console.log(data);
});
socket.on("ui", data => {
  console.log(data);
});
