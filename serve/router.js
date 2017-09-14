const http = require('http');
const qs = require('querystring');
const url = require('url');
const filter = require('./filter');
const config = require('../config.json');
const router = [
    {
        api: '/crawler',
        http(req, res) {

        }
    },
    {
        api: '/outlogin',
        http(req, res) {
            req.session.userId = null;
            req.session.username = null;
            req.session.password = null;
            res.redirect('/home');
        }
    },
    {
        api: '/home',
        type: 'get',
        isLogin: true,
        http(req, res) {
            res.sendfile('src/home.html');
        }
    },
    {
        api: '/login',
        type: 'get',
        http(req, res) {
            if (req.session.userId) {
                res.redirect('/home');
            } else {
                res.sendfile('src/login.html');
            }

        }
    },
    {
        api: '/userInfo',
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
            const username = req.body.username;
            const password = req.body.password;

            let success = false;
            config.user.forEach((v, i) => {
                if (username === v.name && password === v.password) {
                    success = true;
                    return false;
                }
            })

            if (success) {
                req.session.userId = new Date().getTime();
                req.session.username = req.body.username;
                req.session.password = req.body.password;
                res.redirect("/home.html");
                return;
            }
            res.send({ message: '用户名或者密码错误' });

        }
    },
    {
        isLogin: true,
        api: '/weather/forecast',
        http(req, res) {

            const city = req.body.city;
            //console.log(req.headers.cookie);
            //console.log(arg.city);CHSC000000

            const promise = new Promise((resolve, reject) => {

                http.get('http://tj.nineton.cn/Heart/index/all?city=' + city, (res) => {
                    let data = '';
                    const titles = [];
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
        api: '/*',
        http(req, res) {
            res.sendfile('dist/index.html');
        }
    }
]

exports.router = (app) => {
    router.forEach((v, i) => {
        let type = 'post';
        if (Object.is(v.type, 'get')) {
            type = 'get';
        }

        if (v.isLogin) {
            app[type](v.api, filter, v.http);
        } else {
            app[type](v.api, v.http);
        }
    });
};
exports.setting = { name: 'router.js' };
