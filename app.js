let express = require('express');
let colors = require( "colors")
let exec = require('child_process').exec;
let cookieParser = require('cookie-parser');

let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();
let server = require('http').Server(app);
let webSocket = require('socket.io')(server);
let port = 3030;

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
require('./serve/router')(app);




app.use(express.static('src'));

server.listen(port);



app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


exec(`start http://127.0.0.1:${port}/index`);

console.log(" start ".info);