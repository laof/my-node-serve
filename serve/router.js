let api = require('./api.json');
let http = require('http');
let qs = require('querystring');
let url = require('url');
module.exports = [
    {
        api: '/',
        type: 'get',
        http(req, res) {
            if (req.session.userId) {
                res.sendfile('/index');
            } else {
                res.redirect('/login');
            }

        }
    },
    {
        api: '/index',
        type: 'get',
        isLogin:true,
        http(req, res) {
            res.sendfile('src/index.html');
        }
    },
    {
        api: '/login',
        type: 'get',
        http(req, res) {
            if (req.session.userId) {
                res.redirect('/index');
            } else {
                res.sendfile('src/login.html');
            }

        }
    },
    {

        api: api.user_info,
        http(req, res) {
            res.send({
                sucess: !0, user: {
                    id: req.session.userId,
                    name: req.session.username
                }
            });
        }
    },
    {
        api: '/user/login',
        type: 'post',
        http(req, res) {
            let username = req.body.username;
            let password = req.body.password;
            if (username == '' || password == '') {
                res.send({ message: '用户名或者密码错误' });
                return;
            }
            req.session.userId = new Date().getTime();
            req.session.username = req.body.username;
            req.session.password = req.body.password;
            res.redirect("/index.html");
        }
    },
    {
        isLogin:true,
        api: api.weather_forecast,
        http(req, res) {

            let arg = req.body.city;
            console.log(req.headers.cookie);
            //console.log(arg.city);CHSC000000

            let promise = new Promise((resolve, reject) => {

                http.get('http://tj.nineton.cn/Heart/index/all?city=' + arg.city, (res) => {
                    let data = '';
                    let titles = [];
                    res.setEncoding('utf-8');
                    //监听data事件，每次取一块数据
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        resolve(data);
                    });

                }).on('error', (err) => {
                    reject(err);
                    console.log(err);
                });

            });

            promise.then((promres) => {
                res.send(promres);
            }, (err) => {
                res.send({ sucess: false, code: 404 });
            })
        }
    },
    {
        api: api.index,
        http(req, res) {
            res.sendfile('dist/index.html');
        }
    }
]
