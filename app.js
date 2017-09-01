let express = require('express');

let exec = require('child_process').exec;
let cookieParser = require('cookie-parser');

let bodyParser = require('body-parser');
let app = express();
let server = require('http').Server(app);
let webSocket = require('socket.io')(server);
let port = 3030;



require('./serve/socket.io')(webSocket);
require('./serve/setting')();
require('./serve/router')(app);


app.use(express.static('src'));


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


server.listen(port);
console.log('>start');
exec(`start http://127.0.0.1:${port}/index`);