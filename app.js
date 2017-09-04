const express = require('express');
const colors = require("colors");
const exec = require('child_process').exec;
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const server = require('http').Server(app);
const webSocket = require('socket.io')(server);
const { router, setting } = require('./serve/router');
const port = 3030;

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

  require('./serve/crawler');
  return;

app.use(session({
    secret: '12345',
    name: 'SESSIONID',
    cookie: { maxAge: 60 * 60 * 1000 }, //10分钟
    resave: false,
    saveUninitialized: true
}))


require('./serve/socket.io')(webSocket);
require('./serve/setting')();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('src'));

router(app);

app.use(cookieParser());
server.listen(port);

exec(`start http://127.0.0.1:${port}/index`);

console.log(" start ".info);