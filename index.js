const Raspi = require("raspi-io");
const five = require("johnny-five");
const { HOST, PORT } = require("./config.json");
const socket = require("socket.io-client")(`http://${HOST}:${PORT}`);
//const say = require("say")

const board = new five.Board({
    io: new Raspi(),
    repl: false
});
let motors
board.on("ready", async() => {
    console.log("YEah");
    //await say.speak(`Board Ready`)
    motors = new five.Motors([{
        pins: {
            pwm: "GPIO12",
            dir: "GPIO6"
        },
        pins: {
            pwm: "GPIO13",
            dir: "GPIO19"
        }
    }]);
    motors.forEach(motor => {
        motor.on("start", () => {
            console.log("Started")
        })
    })

    motors.forward(255)
});

board.on("info", console.log)
board.on("ready", console.log)
board.on("warn", console.log)
board.on("fail", console.log)

socket.on("connect", () => console.log(`Socket connected to ${HOST}:${PORT}`));

socket.on("board", data => {});
socket.on("ui", data => {

    socket.emit("board", data);
    if (data.motor && typeof data.motor !== "string")
        moveMotor(data.motor)
});

const moveMotor = ({ direction: { x, y, angle }, speed }) => {
    console.log(x, y, angle, speed)
    if (angle === "up")
        motors.forward(speed)
    else
        motors.brake()
}