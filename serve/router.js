const http = require('http');
const qs = require('querystring');
const url = require('url');
const filter = require('./filter');
const config = require('../config.json');
const fs = require('fs');
const convert = require('xml-js');
const pathFile = 'router.xml';
const content = fs.readFileSync(pathFile, 'utf-8');
const xml2string = convert.xml2json(content, { compact: true, spaces: 4 });

class HttpServletRequest {

    constructor() {

    }

    CrwlerServe(req, res) {

    }

    OutloginServe(req, res) {
        req.session.userId = null;
        req.session.username = null;
        req.session.password = null;
        res.redirect('/home');
    }

    DefaultServe(req, res) {
        res.sendfile('dist/index.html');
    }

    UserInfoServe(req, res) {
        res.send({
            sucess: !0, user: {
                id: req.session.userId,
                name: req.session.username
            }
        });
    }

    Login(req, res) {
        if (req.session.userId) {
            res.redirect('/home');
        } else {
            res.sendfile('src/login.html');
        }

    }

    HomeServe(req, res) {
        res.sendfile('src/home.html');
    }

    LoginServe(req, res) {
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

    WeatherServe(req, res) {

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
}


exports.router = (app) => {

    const xml2json = JSON.parse(xml2string);
    const router = xml2json.router.item;
    const httpServletRequest = new HttpServletRequest();

    router.forEach((v, i) => {
        const attr = v._attributes;
        const route = attr.route;
        const type = attr.type ? attr.type : 'post';

        if (Object.is("true", attr.login_check)) {
            app[type](attr.url, filter, httpServletRequest[route]);
        } else {
            app[type](attr.url, httpServletRequest[route]);
        }
    });
};
exports.setting = { name: 'router.js' };
