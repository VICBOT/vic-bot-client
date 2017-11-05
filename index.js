const Raspi = require("raspi-io")
const five = require("johnny-five");
const socket = require("socket.io-client")("https://f54464bd.ngrok.io");
const board = new five.Board({
  io: new Raspi()
})

board.on("ready",() => {
  console.log("YEah")
})
socket.on("connect", () => console.log("HELLO"));

socket.on("board", data => {});
socket.on("ui", data => {
  socket.emit("board", data);
});


