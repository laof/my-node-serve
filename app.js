let express = require('express');
let session = require('express-session');
let exec = require('child_process').exec;
let cookieParser = require('cookie-parser');
let router = require('./serve/router');
let app = express();

let port = 3030;

app.use(express.static('src'));
app.use(cookieParser());
app.use(session({
    secret: '12345', 
    name: 'SESSIONID', 
    cookie: { maxAge: 80000 }, 
    resave: false, 
    saveUninitialized: true,
}))
router.forEach((v, i) => {
    app.post(v.api, v.http);
});



app.listen(port);
console.log('>start');
exec(`start http://127.0.0.1:${port}`);