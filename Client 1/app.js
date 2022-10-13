const colors = require("colors");
const moment = require("moment");
const io = require("socket.io-client");
const config = require("./config/index");
const socket = io("http://127.0.0.1:5678");
console.log(colors.blue('Application date & time starting----@ ' + moment().format("YYYY-MM-DD HH:mm:ss")));
socket.on("connect", () => {
    socket.emit('storeClientInfo', { customId: config.id });
    socket.emit('connected', { customId: config.id });
    console.log(colors.yellow(`Connected with id : ${config.id}`));
});

socket.on("disconnect", () => {
    console.log(colors.red('Socket Disconnected From Server'));
})

