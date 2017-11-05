const Raspi = require("raspi-io");
const five = require("johnny-five");
const { HOST, PORT } = require("./config.json");
const socket = require("socket.io-client")(`http://${HOST}:${PORT}`);
const say = require("say")

const board = new five.Board({
    io: new Raspi(),
    repl: false
});
let motorLeft, motorRight
board.on("ready", async() => {
    let rightPins = {
            pins: {
                pwm: "GPIO12",
                dir: "GPIO6"
            }
        },
        leftPins = {
            pins: {
                pwm: "GPIO13",
                dir: "GPIO19"
            }
        }
    motorLeft = new five.Motor(leftPins)
    motorRight = new five.Motor(rightPins)

});

board.on("info", console.log)
board.on("ready", console.log)
board.on("warn", console.log)
board.on("fail", console.log)

socket.on("connect", () => console.log(`Socket connected to ${HOST}:${PORT}`));

socket.on("board", data => {});
socket.on("ui", data => {

    socket.emit("board", data);

    if (data.motor) {
        moveMotor(data.motor)
    }

});

const moveMotor = (motor) => {
    let { speed, direction } = motor
    let revSpeed = 255 - speed
    if (!direction || speed == 0) {

        motorLeft.stop()
        motorRight.stop()

        console.log("BRAKED", speed)
    }
    else if (direction === "up") {
        motorLeft.fwd(revSpeed)
        motorRight.fwd(revSpeed)
        console.log("Forward", revSpeed)
    }
    else if (direction === "down") {
        motorLeft.rev(speed)
        motorRight.rev(speed)
        console.log("Reverse", speed)
    }
    else if (direction === "left") {
        motorLeft.rev(speed)
        motorRight.fwd(revSpeed)
        console.log("Left", speed)
    }
    else if (direction === "right") {
        motorLeft.fwd(revSpeed)
        motorRight.rev(speed)
        console.log("Right", speed)
    }

}