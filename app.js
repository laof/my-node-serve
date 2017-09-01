let express = require('express');

let exec = require('child_process').exec;
let cookieParser = require('cookie-parser');

let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();
let server = require('http').Server(app);
let webSocket = require('socket.io')(server);
let port = 3030;


app.use(session({
    secret: '12345',
    name: 'SESSIONID',
    cookie: { maxAge: 60 * 60 * 1000 }, //10分钟
    resave: false,
    saveUninitialized: true
}))


require('./serve/socket.io')(webSocket);
require('./serve/setting')();
require('./serve/router')(app);



app.use(express.static('src'));

server.listen(port);



app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());



console.log('>start');
exec(`start http://127.0.0.1:${port}/index`);