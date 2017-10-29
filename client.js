const five = require("johnny-five");
const socket = require("socket.io-client")("https://f54464bd.ngrok.io");

socket.on("connect", () => console.log("HELLO"));

socket.on("board", data => {});
socket.on("ui", data => {
  socket.emit("board", data);
  moveMotor(data);
});

const moveMotor = data => {
  console.log(data);
};
