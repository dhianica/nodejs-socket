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
        clients.push(clientInfo);
    });
    socket.on("connected", (data) => {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), `--> Connected from ${data.customId}`)
    })

    socket.on("disconnect", (data) => {
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"), `--> Disonnected from ${data.customId}`)
    })
});

// server
io.sockets.on('error', () => {
    console.log('error')
});


app.post('/', async (req, res) => {
    console.time("dbsave");
    const type = req.body.type
    for (let index = 0; index < 100000000; index++) {
        console.log(index)
    }
    console.timeEnd("dbsave");  
    res.send(`OKE /`)
})


app.post('/testtt', async (req, res) => {
    res.send('OKE TESTTT')
})


app.post('/call', async (req, res) => {
    res.send({
        "timestamp": "2022-02-16T03:18:40.558+00:00",
        "status": 200,
        "message": "CallNext:: Queue Info Success",
        "eventId": "42288aEMJssmCqC-ePtT03663223-hOSnd50857",
        "queueId": 23,
        "queueNo": "A001",
        "eformTypeId": 0,
        "dataEktp": {
            "id": 1,
            "nik": "3271056005900019",
            "nama": "MARIA MAGDALENA SARLITA",
            "tmpt_tgl_lahir": "BOGOR, 20-05-1990",
            "jenis_kelamin": "PEREMPUAN",
            "gol_darah": "O",
            "alamat": "JL. KOTA BARU NO.8",
            "rtrw": "002/003",
            "desa": "KEDUNGHALANG",
            "kecamatan": "KOTA BOGOR UTARA",
            "provinsi": "JAWA BARAT",
            "kota": "KOTA BOGOR",
            "agama": "KATHOLIK",
            "status_perkawinan": "BELUM KAWIN",
            "pekerjaan": "PELAJAR/MAHASISWA",
            "kewarganegaraan": "WNI",
            "photo": "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA1ACsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDx5VQRKSq/dHakmls7c7ZCJJP7kQBx9W6fzolCC1jd2ICkZAPJ4q/o3hKbWZWeGQLED1Irqr1+R2RnTpOZlG8hbG2ywM4OZAT/AOg0+KSGc7UUBuu1gAf/AK9ehx/DOSO2DSSoR7JnIrnde8HPYIZYn3FORhcEVzRxTvubvDStexg7FH8C/lTgiY+4v5UyJ964/iXg/X1qUDivSi1JJnG9HYp3inyIQASzkYx6Yr1zwtbvp2lWkBh3SbQW2kAfmeK8riffdWkDYIyMY/nXsui2lnqllFb3USSgD7r/AHfxFeNiJXa8z1MJC932Okhv4Z4GTa67R8wJBx+IJFctrdxDOzRGW0Vz92Jpv3hH07VqW8Fta7oNPiAUBlYIOOmP5UxbHTru2eV4YxcxqA4KDLD1zWDkjs9m7Hh1xC9jrVxatztY9fTtUo6Va8UzCHxTchFG1lXP5VUU5UV7GEneFjxcRHlm0VcvbGG6t5CJF4zj2wR9K9W8N3aXmlxywPh3TGM9DXk1y0kLRIw2rsBwPX1rrfDMxiZ4rc/vCA/klsbwe6npkHtXn1YpxuduHlKnPlZ6PG91IWjls7YLGmFYuf8ADNZpu5YY3+0iOGOPIVU4zx1NV7LxUbXfBd287N0H7s5/L1rmPFeoXF0pZ45IIZCFCH75Xvkds/nWCi27HZKolG6MDVp0u9RnukQYY/Ix7jtWegl2D95jj0qtNLO9wUYbXX5SoqykdwVBBOK7Ytx2PKlq22bsmnxTXsJkwwAj+XHB4HFZuqR/2VrUiW7uBBIAmT/CQGx+uKKKk9LFwioSklrzfoz1nSrfz9ODvI33Rxk1zmpeWNWUtGGWFS4XOAT0FFFclL4zemk3E86Nx52qyvtAEjk4z92mkuCRuNFFdh47d5Ns/9k="
        },
        "dataEform": {
            "account": "123456789012345",
            "accountName": "Maria",
            "nominal": "1000000",
            "transactionType": ""
        }
    })
})

app.post('/start', async (req, res) => {
    res.send({
        "timestamp": "2022-02-16T03:19:17.871+00:00",
        "status": 200,
        "message": "Create Call:: Queue Info Success",
        "eventId": "43617OlNeQwcuyt-qJQn87784633-BFEcU66705",
        "queueId": 33,
        "queueNo": "",
        "eformTypeId": 0,
        "dataEktp": null,
        "dataEform": null
    })
})

app.post('/finish', async (req, res) => {
    res.send({
        "timestamp": "2022-02-16T03:19:17.871+00:00",
        "status": 200,
        "message": "Create Call:: Queue Info Success",
        "eventId": "43617OlNeQwcuyt-qJQn87784633-BFEcU66705",
        "queueId": 33,
        "queueNo": "",
        "eformTypeId": 0,
        "dataEktp": null,
        "dataEform": null
    })
})

module.exports = {
    app,
    io
};