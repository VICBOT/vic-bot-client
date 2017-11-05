const Raspi = require("raspi-io");
const five = require("johnny-five");
const { HOST, PORT } = require("./config.json");
const socket = require("socket.io-client")(`${HOST}:${PORT}`);
const board = new five.Board({
  io: new Raspi(),
  repl: true
});

board.on("ready", () => {
  console.log("YEah");

  const motor = new five.Motor({
    pins: {
      pwm: "GPIO12",
      dir: "GPIO6"
    }
  });
});
socket.on("connect", () => console.log("HELLO"));

socket.on("board", data => {});
socket.on("ui", data => {
  socket.emit("board", data);
});
