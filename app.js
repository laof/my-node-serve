const express = require('express');
const net = require('net');
const exec = require('child_process').exec;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const server = require('http').Server(app);
const webSocket = require('socket.io')(server);
const { router, setting } = require('./serve/router');

require('./serve/socket.io')(webSocket);
require('./serve/setting')();

const config = require('./config.json');

require("colors").setTheme({ silly: 'rainbow', input: 'grey', verbose: 'cyan', prompt: 'grey', info: 'green', data: 'grey', help: 'cyan', warn: 'yellow', debug: 'blue', error: 'red' });

if (config.crawler.open) {
     require('./serve/crawler');
    return;
}


let port = config.port;

const portCheck = (port) => {

    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port);

        server.on('listening', () => {
            server.close();
            resolve(port);
        })

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log('The port[' + port + '] is occupied, please change other port.');
                resolve(1);
            } else {
                resolve(2);
            }
        })
    })

}

const portAsync = async (port) => {
    let num = port;
    let resCode;

    if (!config.portOccupancy) {
        return Promise.resolve(num);
    }

    while (true) {
        resCode = await portCheck(num);
        if (resCode == 1) {
            num++;
            continue;
        } else if (resCode == 2) {
            return Promise.reject();
        } else {
            break;
        }
    }
    return num;
}

const portPromise = portAsync(port);

app.use(session({
    secret: '12345',
    name: 'SESSIONID',
    cookie: { maxAge: config.session.maxAge * 60 * 1000 }, //分钟
    resave: false,
    saveUninitialized: true
}))


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(config.static));

router(app);

app.use(cookieParser());





portPromise.then(port => {

    server.listen(port);

    server.on('listening', () => {

        config.autoBrowser && exec(`start http://127.0.0.1:${port}/home`);

        console.log(`[${new Date().toLocaleString()}] Service startup successful  127.0.0.1:${port} `.info);
    })
    server.on('error', (err) => {
        console.log(`warn: this port number ${port}  may be occupied `.warn);
    })

}).catch(err => {
    console.log('error: An unknown error was detected '.error);
})


