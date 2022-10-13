const express = require("express");
const cors = require("cors");
const app = express();
const moment = require('moment');
const sockets = require('socket.io');
const colors = require('colors');
const EventEmitter = require('events');

app.use(cors());
app.use(express.urlencoded({ extended: false, parameterLimit: 10000 }));
app.use(express.json());

let usePort = 5678
const server = app.listen(usePort, () => {
    console.log(colors.blue('Application date & time starting----@ ' + moment().format("YYYY-MM-DD HH:mm:ss")));
    console.log(colors.blue(`API server ip & port running--------@ http://127.0.0.1:` + usePort));
});

const io = sockets(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
});

var clients = [];

io.sockets.on('connection', (socket) => {
    socket.on('storeClientInfo', function (data) {
        var clientInfo = new Object();
        clientInfo.customId = data.customId;
        clientInfo.clientId = socket.id;
        clientInfo.connectTime = new Date()
        clients.push(clientInfo);
    });
    socket.on("connected", (data) => {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), `--> Connected from ${data.customId}`)
    })

    socket.on("disconnect", (data) => {
        const clientDisconnect = clients.find((x) => x.clientId === socket.id)
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), `--> Disonnected from ${clientDisconnect.customId}`)
    })
});

// server
io.sockets.on('error', () => {
    console.log('error')
});

module.exports = {
    app,
    io
};