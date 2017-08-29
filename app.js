let express = require('express');
let exec = require('child_process').exec;

let router = require('./serve/router');
let app = express();

let port = 3000;

app.use(express.static('dist'));


router.forEach((v, i) => {
    app.get(v.api, v.http);
});



app.listen(port);
console.log('>启动成功');
exec(`start http://127.0.0.1:${port}`);