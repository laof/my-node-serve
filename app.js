let express = require('express');
let session = require('express-session');
let exec = require('child_process').exec;
let cookieParser = require('cookie-parser');
let router = require('./serve/router');
let filter = require('./serve/filter');
let bodyParser = require('body-parser');
let server = require('http').Server(app);
let webSocket = require('socket.io')(server);

let port = 3030;
app.use(express.static('src'));
// app.use();
// app.use(express.cookieParser('sctalk admin manager'));
// app.use(express.session());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(session({
    secret: '12345',
    name: 'SESSIONID',
    cookie: { maxAge: 60 * 60 * 1000 }, //10分钟
    resave: false,
    saveUninitialized: true,
}))
router.forEach((v, i) => {
    let type = 'post';
    if (Object.is(v.type, 'get')) {
        type = 'get';
    } else {

    }
    if (v.isLogin) {
        app[type](v.api, filter.login, v.http);
    } else {
        app[type](v.api, v.http);
    }

});

server.listen(port);
webSocket.on('connection', (socket) => {


    socket.on('group1',  (data) =>{
        console.log('group1........')
        socket.join('group1');
    });

    console.log('2121');
    socket.on('login', (data) => {
        console.log(data);
    })
    socket.on('message', (msg) => {
        console.dir(msg);
    });

    //给除了自己以外的客户端广播消息
    socket.broadcast.emit("server not me", { data: "hello,everyone" });

    //给所有客户端广播消息
    socket.emit('server send', { sisis: 23232 });
})

fs.writeFileSync(path.join(__dirname, 'src/config.json'), JSON.stringify(webConfig));

console.log('>start');
exec(`start http://127.0.0.1:${port}/index`);