const colors = require("colors");
const moment = require("moment");
const io = require("socket.io-client");
const socket = io("http://127.0.0.1:5678");
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
const axios = require('axios')
const customId = 'hvbWL1joLk2o9kpHfExWGw'
console.log(colors.blue('Application date & time starting----@ ' + moment().format("YYYY-MM-DD HH:mm:ss")));

socket.on("connect", () => {
    socket.emit('storeClientInfo', { customId });
    socket.emit('connected', { customId });
    console.log(colors.yellow(`Connected with id : ${customId}`));

});

socket.on(`blockTransaction-${customId}`, async (data) => {
    console.log(`Server Emit ${data.type}`)
})

socket.on("disconnect", () => {
    console.log(colors.red('Socket Disconnected From Server'));
})

