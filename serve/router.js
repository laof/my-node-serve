let api = require('./api.json');
let http = require('http');
let qs = require('querystring');
let url = require('url');
module.exports = [
    {
        api: api.weather_forecast,
        http(req, res) {

            let arg = url.parse(req.url, false).query;
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
